import { Product } from '../../../../api/design/product'
const ProductApi = new Product()
const app = getApp()

Page({

  data: {
    id: '',
    userInfo: {},
    address: '',
    occupation: '',
    tag: '作品',
    designParams: {
      page: 1,
      rows: 16
    },
    albumParams: {
      page: 1,
      rows: 16
    },
    designCanDown: true,
    albumCanDown: true,
    designList: [],
    albumList: []
  },

  onLoad: function (options) {
    app.sssssssss()
    let userInfo = app.g.userInfo
    this.setData({
      userInfo,
      "designParams.uId": userInfo.id,
      "albumParams.uId": userInfo.id
    }, () => {
      this.getUserCollDesignList()
    })
  },

  // 查用户收藏的作品列表
  getUserCollDesignList() {
    let list = this.data.designList
    ProductApi.getUserCollDesignList(this.data.designParams)
      .then(res => {
        let rows = res.data.rows
        if (rows.length) {
          list = list.concat(rows)
          this.setData({
            designList: list
          })
        } else {
          this.setData({
            designCanDown: false
          })
        }
      })
  },

  // 查用户收藏专辑列表
  getUserCollAlbumList() {
    wx.showLoading({
      title: '',
      icon: 'none'
    })
    ProductApi.getUserCollAlbumList(this.data.albumParams)
      .then(res => {
        wx.hideLoading()
        let rows = res.data.rows
        let list = [] // csDesignWorks
        for (let i = 0; i < rows.length; i++) {
          if (rows[i].csAlbum.csDesignWorks && rows[i].csAlbum.csDesignWorks.length) {
            if (!rows[i].csAlbum.pushHomeThumbnails) {
              rows[i].csAlbum.pushHomeThumbnails = rows[i].csAlbum.csDesignWorks[0].thumbnail
            }
            list.push(rows[i])
          }
        }
        if (list.length) {
          this.setData({
            albumList: list
          })
        } else {
          this.setData({
            albumCanDown: false
          })
        }
      })
  },

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

  tagClick(e) {
    let { name } = e.currentTarget.dataset
    this.setData({
      tag: name
    })
    if (name === '专辑' && !this.data.albumList.length) {
      this.getUserCollAlbumList()
    }
  },

  onReachBottom() {
    let {tag} = this.data

    if (tag == '作品' && this.data.designCanDown) {
      let rules = this.data.designParams
      rules.page = ++rules.page
      this.setData({
        designParams: rules
      }, () => {
        this.getUserCollDesignList()
      })
    } else if (this.data.albumCanDown) {
      let rules = this.data.albumParams
      rules.page = ++rules.page
      this.setData({
        albumParams: rules
      }, () => {
        this.getUserCollAlbumList(rules)
      })
    }
  },

  goPath(e) {
    const { path } = e.currentTarget.dataset
    wx.navigateTo({
      url: path
    })
  },
})