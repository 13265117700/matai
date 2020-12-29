const app = getApp()
Page({

  data: {
    price: 0,
    point: 0,
    time: '2020-05-05',
    payType: 1, // 1微信支付 2余额支付 3共享分
    payTypeText: '微信支付',
    payStatus: 'success',
    orderId: '0'
  },

  onLoad: function (options) {
    console.log(options) // orderId=1596780396412241&payType=2&price=998&sharePoint=1000&payStatus=fail
    let {
      price,
      sharePoint,
      payType,
      payStatus,
      orderId
    } = options
    payType = payType || 1
    let payTypeText = '微信支付'
    if (payType == 2) {
      payTypeText = '余额支付'
    } else if (payType == 3) {
      payTypeText = '共享分支付'
    }
    if (payStatus == 'fail') {
      wx.setNavigationBarTitle({
        title: '支付失败',
      })
    }
    this.setData({
      price: price || 0,
      point: sharePoint || 0,
      payType: payType || 1,
      payTypeText,
      payStatus,
      orderId
    })
  },
  goOrderInfo() {
    wx.navigateTo({
      url: '/pages/design/my/mall/order/detail/detail?id=' + this.data.orderId,
    })
  },
  back() {
    wx.navigateBack({
      delta: 2
    })
  }
})