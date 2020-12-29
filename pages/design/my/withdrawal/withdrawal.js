import {
  Account
} from '../../../../api/design/account'
import {
  WithDrawal
} from '../../../../api/design/withdrawal'
const AccountApi = new Account()
const WithDrawalApi = new WithDrawal()
const app = getApp()
Page({
  data: {
    userInfo: {},
    alipayInfo: null,
    bankInfo: null,
    alipayText: '',
    bankText: '',
    showText: '',
    countries: [],
    countryIndex: 0,
    form: {
      userPaymentId: '',
      withdrawalAmount: ''
    }
  },

  onShow() {
    app.sssssssss()
    let userInfo = app.g.userInfo
    let {aliPay, bankCard} = userInfo
    let have = aliPay == 2 || bankCard == 2

    if (!have) {
      return wx.showModal({
        confirmColor: '#00D1D3',
        confirmText: '确认',
        content: '是否设置提现账号？',
        title: '暂未绑定提现账号',
        success (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/design/my/wallet/account/account',
            })
          } else if (res.cancel) {
            wx.navigateBack()
          }
        }
      })
    }
    this.setData({
      userInfo
    })
    this.getInfo()
  },
  // 进行提现
  doWd() {
    let { form, countryIndex, list } = this.data
    if (form.withdrawalAmount < 100) {
      return wx.showToast({
        title: '金额小于100无法提现',
        icon: 'none'
      })
    }
    form.userPaymentId = list[countryIndex].id
    console.log(form)
    WithDrawalApi.doWithDrawal(form)
      .then(res => {
        let data = {
          account: this.data.showText,
          price: this.data.form.withdrawalAmount
        }
        if (res.state == 200) {
          wx.setStorageSync('withdrawal', data)
          wx.navigateTo({
            url: './status/status',
          })
          app.getServerUserInfo(userInfo => {
            this.setData({
              userInfo
            })
          })
        } else {
          wx.showToast({
            title: res.message || '提交失败请稍后重试',
            icon: 'none'
          })
        }
      })
  },
  // 全部提现
  wdAll() {
    let { userInfo } = this.data
    console.log(userInfo.balance)
    this.setData({
      "form.withdrawalAmount": userInfo.balance
    })
  },
  getInfo() {
    AccountApi.fetchList()
      .then(res => {
        let list = res.data
        let o1 = null
        let o2 = null
        let alipayText = ''
        let bankText = ''
        let showText = ''
        let countries = []
        for (let i = 0; i < list.length; i++) {
          if (list[i].paymentType == 1) {
            o1 = list[i]
            alipayText = '支付宝(' + list[i].receivingAccount.slice(0, 4) + '****' + list[i].receivingAccount.slice(-4) + ')'
            showText = showText || alipayText
            countries.push(alipayText)
          }
          if (list[i].paymentType == 2) {
            o2 = list[i]
            bankText = list[i].bankDeposit + '(' + list[i].receivingAccount.slice(-4) + ')'
            showText = showText || bankText
            countries.push(bankText)
          }
        }
        this.setData({
          list,
          alipayInfo: o1,
          bankInfo: o2,
          alipayText,
          bankText,
          showText,
          countries
        })
      })
  },

  back() {
    wx.navigateBack()
  },
  bindCountryChange: function (e) {
    let list = this.data.countries

    this.setData({
      countryIndex: e.detail.value,
      "showText": list[e.detail.value]
    })
  },
  formInputChange(e) {
    let value = e.detail.value
    let { userInfo } = this.data

    const {
      field
    } = e.currentTarget.dataset
    if (value > userInfo.balance) {
      value = userInfo.balance
    }
    this.setData({
      [`form.${field}`]: value
    })
  },
})