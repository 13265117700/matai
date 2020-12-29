import {
  Account
} from '../../../../../api/design/account'
const AccountApi = new Account()
const app = getApp()

Page({
  data: {
    tabs: [{
        id: 1,
        name: '支付宝'
      },
      {
        id: 2,
        name: '银行卡'
      }
    ],
    currentTab: '支付宝',
    showTopTips: false,
    rules: [{
      name: 'name',
      rules: {
        required: true,
        message: '请输入收款姓名'
      },
    }, {
      name: 'receivingAccount',
      rules: [{
        required: true,
        message: '请输入收款账号'
      }]
    }, {
      name: 'code',
      rules: {
        required: true,
        message: '请输入验证码'
      },
    }],
    countries: ["中国银行", "建设银行", "工商银行", "农业银行", "中国邮政储蓄银行", "交通银行", "招商银行", "兴业银行"],
    countryIndex: 0,
    formData: {
      bankDeposit: '', // *    string    (query)	开户银行
      code: '', // *    string    (query)	验证码
      idCard: '', // *    string    (query)	身份证号码
      name: '', // *    string    (query)	收款姓名
      paymentType: 1, // *    integer ($int32)(query)支付类型1支付宝，2银行卡
      receivingAccount: '', // *  string    (query)收款账号
    },
    deviceId: '',
    userInfo: null,
    cd: 0,
    timer: null,
    list: [],
    alipayInfo: null,
    bankInfo: null,
    alipayText: '',
    bankText: ''
  },

  onLoad: function () {
    app.sssssssss()
    this.getInfo()
  },
  onShow() {
    app.checkBindPhone()
  },
  getInfo() {
    AccountApi.fetchList()
      .then(res => {
        let list = res.data
        let o1 = null
        let o2 = null
        let alipayText = ''
        let bankText = ''
        for (let i = 0; i < list.length; i++) {
          if (list[i].paymentType == 1) {
            o1 = list[i]
            alipayText = list[i].receivingAccount.slice(0,4) + '****' + list[i].receivingAccount.slice(-4)
          }
          if (list[i].paymentType == 2) {
            o2 = list[i]
            bankText = list[i].receivingAccount.slice(0,4) + '****' + list[i].receivingAccount.slice(-4)
          }
        }
        this.setData({
          list,
          alipayInfo: o1,
          bankInfo: o2,
          alipayText,
          bankText
        })
      })
  },
  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  // 校验
  submitForm() {
    let {alipayInfo, bankInfo, formData, currentTab} = this.data
    this.selectComponent('#form').validate((valid, errors) => {
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })
        }
      } else {
        // 根据是否有添加收款信息, 根据情况进行新增或修改
        console.log('else')
        if (alipayInfo && currentTab == '支付宝') {
          let data = Object.assign(alipayInfo, formData)
          this.updateAccount(data)
        } else if (bankInfo && currentTab == '银行卡') {
          let data = Object.assign(bankInfo, formData)
          this.updateAccount(data)
        } else {
          this.addAccount(formData)
        }
      }
    })
  },
  /**
   * 添加收款信息
   */
  addAccount(data) {
    AccountApi.addAccount(data)
      .then(res => {
        console.log('addAccount', res)
        if (res.status === 200) {
          wx.showToast({
            title: '添加成功',
            duration: 2000,
            mask: true
          })
          this.getInfo()
          app.getServerUserInfo()
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 3000
          })
        }
      }).catch(err => {
        wx.showToast({
          title: '添加失败',
          icon: 'none'
        })
      })
  },
  /**
   * 修改收款信息
   */
  updateAccount(data) {
    AccountApi.updateAccount(data)
      .then(res => {
        if (res.status === 200) {
          wx.showToast({
            title: '修改成功',
            duration: 2000,
            mask: true
          })
          this.getInfo()
          app.getServerUserInfo()
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 3000
          })
        }
      }).catch(err => {
        wx.showToast({
          title: '添加失败',
          icon: 'none'
        })
      })
  },
  getSMS() {
    if (this.data.cd) {
      return
    }
    AccountApi.getSMS()
      .then(res => {
        if (res.data == '短信发送成功') {
          wx.showToast({
            title: '短信发送成功',
            icon: 'none'
          })
          this.setCD()
        }
      }).catch(() => {
        wx.showToast({
          title: '系统出错请重试',
          icon: 'none'
        })
      })
  },

  setCD() {
    let cd = 60
    this.data.timer = setInterval(() => {
      cd -= 1
      this.setData({
        cd
      })
      if (cd <= 0) {
        this.setData({
          cd: 0
        })
        clearInterval(this.data.timer)
      }
    }, 1000)
  },

  // 
  tabChange(e) {
    let formData = {
      bankDeposit: '', // *    string    (query)	开户银行
      code: '', // *    string    (query)	验证码
      idCard: '', // *    string    (query)	身份证号码
      name: '', // *    string    (query)	收款姓名
      paymentType: 1, // *    integer ($int32)(query)支付类型1支付宝，2银行卡
      receivingAccount: '', // *  string    (query)收款账号 
    }
    const {
      name
    } = e.currentTarget.dataset
    if (name == '银行卡') {
      formData.paymentType = 2
    }
    this.setData({
      currentTab: name,
      formData
    })
  },
  back() {
    wx.navigateBack()
  },
  onUnload() {
    clearInterval(this.data.timer)
  },
  bindCountryChange: function (e) {
    let list = this.data.countries
    console.log('picker country 发生选择改变，携带值为', list[e.detail.value]);

    this.setData({
      countryIndex: e.detail.value,
      "formData.bankDeposit": list[e.detail.value]
    })
  },
})