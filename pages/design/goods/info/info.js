const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [
      { id: 1, name: '映季泡沫地垫...', thumbnail: '/images/temp/sc-1.png', price: 68 },
      { id: 2, name: '三只松鼠奶香...', thumbnail: '/images/temp/sc-2.png', price: 34 },
      { id: 3, name: '减震防滑双面...', thumbnail: '/images/temp/sc-3.png', price: 98 },
      { id: 4, name: '脱脂奶粉（10...', thumbnail: '/images/temp/sc-4.png', price: 109 },
      { id: 5, name: '活力坚果', thumbnail: '/images/temp/sc-5.png', price: 72 },
      { id: 6, name: '新款 MacBook...', thumbnail: '/images/temp/sc-6.png', price: 22199 },
    ],
    info: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.sssssssss()
    let o = this.data.goodsList.find(item => item.id == options.id)
    this.setData({
      info: o
    })
  },

  onShareAppMessage (e) {
    return app.utils.doShare(e, null, app)
  }
})