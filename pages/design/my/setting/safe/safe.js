const app = getApp()
Page({

  data: {
    userInfo: {}
  },

  onShow: function () {
    this.setData({
      userInfo: app.g.userInfo
    })
  },

})