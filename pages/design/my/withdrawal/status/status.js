const app = getApp()
Page({

  data: {
    withdrawal: {}
  },

  onLoad: function () {
    app.sssssssss()
    let d = new Date()
    let withdrawal = wx.getStorageSync('withdrawal')
    withdrawal.time = app.utils.formatTime(d)
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