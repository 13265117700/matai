import User from '../../models/user/user'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let params = {
      Authorization:wx.getStorageSync('Authorization'),
      identity:1,
      page:1,
      rows:10
    }
    User.userAppointFriends(params).then(res => {
      console.log(res)
    })
  },
})