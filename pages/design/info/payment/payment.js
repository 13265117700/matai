import {
  Order
} from '../../../../api/design/order'
import {
  GetOpenid
} from '../../../../api/design/getOpenid'
const GetOpenidApi = new GetOpenid()
const OrderApi = new Order()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: 0,
    orderInfo: {},
    active: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.sssssssss()
    // 传入订单id
    this.setData({
      orderId: options.orderId
    }, () => {
      this.getOrderInfo()
    })
  },
  getOrderInfo() {
    let orderId = this.data.orderId
    OrderApi.getInfo(orderId)
      .then(res => {
        this.setData({
          orderInfo: res.data
        })
      })
  },
  back() {
    wx.navigateBack()
  },
  bindChange(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      active: index
    })
  },
  doPay() {
    let {
      active
    } = this.data
    if (active == 1) {
      // 拉超微信支付
      this.toPay()
    } else {
      // 使用余额支付
      this.toYePay()
    }
  },
  // 微信支付
  toPay() {
    let {
      orderId
    } = this.data.orderInfo
    wx.showLoading({
      title: '',
      mask: true
    })
    // 1. 获取openid
    GetOpenidApi.getOpenid()
      .then(openid => {
        OrderApi.wxPay({
            openid,
            orderId
          })
          .then(wxData => {
            wx.hideLoading()
            wx.requestPayment({
              ...wxData.data,
              success: () => {
                wx.redirectTo({
                  url: `../status/status?price=${orderInfo.orderPrice}&payType=1`,
                })
              },
              fail: function (err) {
                // 支付失败
                wx.showToast({
                  title: '支付取消',
                  icon: 'none'
                })
              }
            })
          })
      })
  },
  toYePay() {
    // 余额支付
    let {
      userInfo
    } = app.g
    let {
      orderInfo
    } = this.data
    let balance = userInfo.balance

    if (orderInfo.orderPrice > balance) {
      return wx.showModal({
        title: '余额不足',
        content: `当前余额为：${balance}`,
        showCancel: true,
        confirmText: '去充值',
        success: res => {
          // wx.navigateBack()
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/design/my/wallet/charge/charge',
            })
          }
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: `使用${orderInfo.orderPrice}购买该作品？`,
        showCancel: true,
        success: res => {
          if (res.confirm) {
            OrderApi.yePay({
              id: orderInfo.orderId
            })
              .then(result => {
                console.log(result)
                if (result.state == 200) {
                  wx.redirectTo({
                    url: `../status/status?price=${orderInfo.orderPrice}&payType=2`,
                  })
                } else {
                  wx.showToast({
                    title: result.message || '购买失败',
                    icon: 'none'
                  })
                }
              })
          }
        }
      })
    }
  }
})