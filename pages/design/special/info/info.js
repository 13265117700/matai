import { Product } from '../../../../api/design/product'
const ProductApi = new Product()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    list: [],
    keywords: [],
    showMore: false, // 查看更多关键字
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.sssssssss()
    this.getInfo(options.id)
  },
  // 获取详情
  getInfo(id) {
    ProductApi.fetchSpecialInfo({id})
      .then(res => {
        let data = res.data
        let keywords = data.details.split(' ')
        let nArr = []
        for (let i = 0; i < keywords.length; i++) {
          if(keywords[i]) {
            nArr.push(keywords[i])
          }
        }
        this.setData({
          list: data.csDesignWorksList,
          info: data,
          keywords: nArr
        })
      })
  },

  goPath(e) {
    const { path } = e.currentTarget.dataset
    if (path) {
      wx.navigateTo({
        url: path
      })
    }
  },

  onShareAppMessage: function (e) {
    let info = this.data.info
    return app.utils.doShare(e, { name: info.name, cover: info.selectedThumbnails }, app)
  },
  // 自定导航栏时的返回
  back() {
    const pages = getCurrentPages()
    if (pages.length < 2) {
      wx.switchTab({
        url: '/pages/index/index',
      })
    } else {
      wx.navigateBack()
    }
  },
  seeMore() {
    this.setData({
      showMore: !this.data.showMore
    })
  }
})