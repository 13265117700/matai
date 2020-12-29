import {
  Charge
} from '../../../../../api/design/charge'
import {
  GetOpenid
} from '../../../../../api/design/getOpenid'
const ChargeApi = new Charge()
const GetOpenidApi = new GetOpenid()
const app = getApp()

Page({
  data: {
    userInfo: {},
    form: {
      price: ''
    },
    list: [{
        price: 20
      },
      {
        price: 30
      },
      {
        price: 50
      },
      {
        price: 100
      }
    ],
    active: ''
  },

  onLoad() {
    app.sssssssss()
    this.setData({
      userInfo: app.g.userInfo
    })
  },
  back() {
    wx.navigateBack()
  },
  formInputChange(e) {
    let value = e.detail.value
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      active: '',
      [`form.${field}`]: value
    })
  },
  tagChange(e) {
    let active = e.currentTarget.dataset.index
    let list = this.data.list
    this.setData({
      active,
      "form.price": list[active].price
    })
  },
  /**
   * 使用微信小程序进行支付
   * 生成充值订单
   */
  doCharge() {
    let { price } = this.data.form
    wx.showLoading({
      title: '',
      mask: true
    })
    // 1. 获取openid
    GetOpenidApi.getOpenid()
      .then(openid => {
        // 2.生成订单 获得orderId
        ChargeApi.doCharge({price})
          .then(res => {
            let orderId = res.data.orderId
            // 3.拉起支付
            ChargeApi.wxPay({
                openid,
                orderId
              })
              .then(wxData => {
                wx.hideLoading()
                wx.requestPayment({
                  ...wxData.data,
                  success: result => {
                    // 支付成功
                    app.getServerUserInfo()
                    wx.navigateTo({
                      url: './status/status?price=' + price,
                    })
                  },
                  fail: function (err) {
                    // 支付失败
                    wx.showToast({
                      title: '充值取消',
                      icon: 'none'
                    })
                  }
                })
              })

          })
      })

  },

})