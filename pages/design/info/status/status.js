const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    price: 0,
    point: 0,
    time: '2020-05-05',
    payType: 1, // 1微信支付 2余额支付 3共享分
    payTypeText: '微信支付'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.sssssssss()
    let {
      price,
      point,
      payType
    } = options
    payType = payType || 1
    let payTypeText = '微信支付'
    if (payType == 2) {
      payTypeText = '余额支付'
    } else if (payType == 3) {
      payTypeText = '共享分支付'
    }
    this.setData({
      price: price || 0,
      point: point || 0,
      payType: payType || 1,
      payTypeText
    })
  },
  goOrderInfo() {
    wx.redirectTo({
      url: '/pages/design/my/designOrder/designOrder',
    })
  },
  back() {
    wx.navigateBack({
      delta: 1
    })
  }
})