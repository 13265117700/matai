import { Product } from '../../api/design/product'
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
    let rules = {
      page: 1,
      rows: 10,
      sortType: 3, // 小程序推送排序
      ...options
    }

    this.setData({
      rules,
      oriRules: Object.assign({}, rules)
    })
    this.getList(rules)
  },
  getList() {
    let oList = this.data.list
    const tokens = app.g.tokens
    wx.showLoading({
      title: '数据正在加载中',
      icon: 'none'
    })
    if (tokens) {
      ProductApi.fetchList2(this.data.rules)
        .then(res => {
          const {
            rows: list
          } = res.data
          wx.hideLoading()
          wx.stopPullDownRefresh()
          if (!list.length) {
            return this.setData({
              canDown: false
            })
          }
          for (let i = 0; i < list.length; i++) {
            list[i].diff = app.utils.getDateDiff(list[i].updateTime)
          }

          this.setData({
            list: oList.concat(list)
          })
        })
    } else {
      ProductApi.fetchList(this.data.rules)
        .then(res => {
          const {
            rows: list
          } = res.data
          wx.hideLoading()
          wx.stopPullDownRefresh()
          if (!list.length) {
            return this.setData({
              canDown: false
            })
          }
          for (let i = 0; i < list.length; i++) {
            list[i].diff = app.utils.getDateDiff(list[i].updateTime)
          }
          this.setData({
            list: oList.concat(list)
          })
        })
    }

  },

  onReachBottom() {
    let { rules, canDown } = this.data
    if (canDown) {
      rules.page = ++rules.page
      this.setData({
        rules
      })
      this.getList(rules)
    }
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
  },
    // 点赞或取消点赞作品
    doLike(e) {
      if (app.checkLogin()) {
        return
      }

      let {
        id,
        status,
        index
      } = e.currentTarget.dataset
      let {
        list,
        list2
      } = this.data
      let info = {}
      if (index == 2) {
        info = list2.find(item => item.id == id)
        if (status) {
          info.likeStatus = false
          info.likeCounts = --info.likeCounts
          ProductApi.cancelPointPraise(id)
            .then(() => {
              this.setData({
                list2
              })
            })
        } else {
          info.likeStatus = true
          info.likeCounts = ++info.likeCounts

          ProductApi.doPointPraise(id)
            .then(() => {
              this.setData({
                list2
              })
            })
        }

      } else {
        info = list.find(item => item.id == id)
        if (status) {
          info.likeStatus = false
          info.likeCounts = --info.likeCounts
          ProductApi.cancelPointPraise(id)
            .then(() => {
              this.setData({
                list
              })
            })
        } else {
          info.likeStatus = true
          info.likeCounts = ++info.likeCounts
          ProductApi.doPointPraise(id)
            .then(() => {
              this.setData({
                list
              })
            })
        }
      }
    },
    // 收藏或取消收藏作品
    doColl(e) {
      if (app.checkLogin()) {
        return
      }

      let {
        id,
        status,
        index
      } = e.currentTarget.dataset
      let {
        list,
        list2
      } = this.data
      let info = {}
      if (index == 2) {
        info = list2.find(item => item.id == id)
        if (status) {
          info.collectionStatus = false
          info.collectionTimes = --info.collectionTimes
          ProductApi.cancelColl(id)
            .then(() => {
              this.setData({
                list2
              })
            })
        } else {
          info.collectionStatus = true
          info.collectionTimes = ++info.collectionTimes

          ProductApi.doColl(id)
            .then(() => {
              this.setData({
                list2
              })
            })
        }

      } else {
        info = list.find(item => item.id == id)
        if (status) {
          info.collectionStatus = false
          info.collectionTimes = --info.collectionTimes
          ProductApi.cancelColl(id)
            .then(() => {
              this.setData({
                list
              })
            })
        } else {
          info.collectionStatus = true
          info.collectionTimes = ++info.collectionTimes
          ProductApi.doColl(id)
            .then(() => {
              this.setData({
                list
              })
            })
        }
      }
    },
})