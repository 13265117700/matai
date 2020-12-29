import { Product } from '../../../api/design/product'
const ProductApi = new Product()
const app = getApp()

Page({
  data: {
    oriRules: {}, // 源查询条件
    rules: {},
    list: [],
    canDown: true, // 是否能上拉加载更多
    str: '2020-05-11 18:06:10'
  },
  onLoad: function (options) {
    app.sssssssss()
    this.getList(options.id)
  },

  getList(id) {
    ProductApi.fetchUserAlbumInfo(id)
      .then(res => {
        // wx.hideLoading()
        wx.stopPullDownRefresh()
        if (res.status === 200) {
          let { csDesignWorks: rows } = res.data
          if (rows.length) {
            for (let i = 0; i < rows.length; i++) {
              rows[i].diff = app.utils.getDateDiff(rows[i].updateTime)
            }
            this.setData({
              list: rows
            })
          } else {
            this.setData({
              canDown: false
            })
          }
        }
      }).catch(() => {
        // wx.hideLoading()
        wx.stopPullDownRefresh()
      })
  },

  onReachBottom() {
    return
    // let { rules, canDown } = this.data
    // if (canDown) {
    //   rules.page = ++rules.page
    //   this.setData({
    //     rules
    //   })
    //   this.getList(rules)
    // }
  },

  onPullDownRefresh() {
    let rules = Object.assign({}, this.data.oriRules)
    this.setData({
      list: [],
      canDown: true,
      rules
    })
    this.getList(rules)
  },

  onShareAppMessage: function (e) {
    return app.utils.doShare(e, null, app)
  },
  goPath(e) {
    const { path } = e.currentTarget.dataset
    if (path) {
      wx.navigateTo({
        url: path
      })
    }
  }
})