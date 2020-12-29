import {
  Product
} from '../../../api/design/product'
const ProductApi = new Product();

const app = getApp()
Page({

  data: {
    list: [],
    eventList: [],
    rules: {
      page: 1,
      rows: 20
    },
    candown: true
  },

  onLoad: function (options) {
    app.sssssssss()
    this.getColumnList()
  },
  // 活动栏目
  getColumnList() {
    let rules = {
      page: 1,
      rows: 1000,
      pId: 0
    }
    ProductApi.fetchEventColumn(rules)
      .then(res => {
        const {
          rows: list
        } = res.data
        this.setData({
          list
        }, () => {
          this.getEventList()
        })
      })
  },
  // 活动列表
  getEventList() {
    wx.showLoading({
      title: '',
      icon: 'none'
    })
    let rules = this.data.rules
    ProductApi.fetchEventList(rules)
      .then(res => {
        wx.stopPullDownRefresh()
        wx.hideLoading()
        const {
          rows: list
        } = res.data
        let l = this.data.list
        if (!list.length) {
          return this.setData({
            candown: false
          })
        }
        for (let i = 0; i < list.length; i++) {
          let o = l.find(item => item.id == list[i].columnId)
          if(o) {
            list[i].t = o.name
          }
        }
        let newList = this.data.eventList.concat(list)
        this.setData({
          eventList: newList
        })
      })
  },
  onShareAppMessage: function () {
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
  onPullDownRefresh() {
    this.setData({
      rules: {
        page: 1,
        rows: 20
      },
      eventList: [],
      candown: true
    }, () => {
      this.getEventList()
    })
  },
  onReachBottom() {
    if(this.data.candown) {
      let rules = this.data.rules
      rules.page = ++rules.page
      this.setData({
        rules
      }, ()=> {
        this.getEventList()
      })
    }
  }
})