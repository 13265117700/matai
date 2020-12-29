const app = getApp()
Page({

  data: {
    withdrawal: {}
  },

  onLoad: function (options) {
    app.sssssssss()
    let {
      price
    } = options
    let d = new Date()
    let withdrawal = {
      time: app.utils.formatTime(d),
      price: price
    }

    this.setData({
      withdrawal
    })
  },
  back() {
    wx.navigateBack({
      delta: 2
    })
  }
})