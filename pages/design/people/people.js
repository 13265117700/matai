import { Product } from '../../../api/design/product'
var desigField = require('../../../data/desigfield.js')
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
      rows: 16,
      classification: 1
    },
    designCanDown: true,
    designList: [],
    albumList: [],
    isFollow: false, // 是否已关注
    showFollow: true // 显示关注按钮
  },

  onLoad: function (options) {
    app.sssssssss()
    let id = options.id
    this.setData({
      "designParams.uId": id,
      id
    })

    this.getDesignerInfo(id)
  },
  
  onShow() {
    let { id } = this.data
    let userInfo = app.g.userInfo
    if (!userInfo) {
      app.asyncUserInfo = res => {
        if (res) {
          let showFollow = res.id != id
          this.doFansCheck(id)
          this.setData({
            showFollow
          })
        }
      }
    } else {
      let showFollow = userInfo.id != id
      this.doFansCheck(id)
      this.setData({
        showFollow
      })
    }
  },

  // 获取设计师资料
  getDesignerInfo(id) {
    wx.showLoading({
      title: '',
      icon: 'none'
    })
    ProductApi.getDesignerInfo(id)
      .then(res => {
        wx.hideLoading()
        let userInfo = res.data
        let address = userInfo.city ? userInfo.city.split('-')[1] : '未填写'
        let occupation = userInfo.occupation ? desigField.desigFieldList[userInfo.occupation].name : '未认证'
        this.setData({
          userInfo,
          address,
          occupation
        })
        this.getUserDesignList()
      })
  },

  // 查用户设计作品列表
  getUserDesignList() {
    let list = this.data.designList
    ProductApi.fetchUserDesignList(this.data.designParams)
      .then(res => {
        console.log(res)
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

  // 查用户专辑列表
  getUserAlbumList() {
    wx.showLoading({
      title: '',
      icon: 'none'
    })
    ProductApi.fetchUserAlbumList(this.data.id)
      .then(res => {
        wx.hideLoading()
        let rows = res.data
        let list = [] // csDesignWorks
        for (let i = 0; i < rows.length; i++) {
          if (rows[i].csDesignWorks && rows[i].csDesignWorks.length) {
            if (!rows[i].pushHomeThumbnails) {
              rows[i].pushHomeThumbnails = rows[i].csDesignWorks[0].thumbnail
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

  onShareAppMessage: function (e) {
    return app.utils.doShare(e, null, app) 
  },

  tagClick(e) {
    let { name } = e.currentTarget.dataset
    this.setData({
      tag: name
    })
    if (name === '专辑' && !this.data.albumList.length) {
      this.getUserAlbumList()
    }
  },

  onReachBottom() {
    let {tag} = this.data

    if (tag == '作品' && this.data.designCanDown) {
      let rules = this.data.designParams
      rules.page = ++rules.page
      this.setData({
        designParams: rules
      })
      this.getUserDesignList()
    }
  },

  handleFollow() {
    let { isFollow } = this.data

    if (isFollow) {
      this.doFansCancel()
    } else {
      this.doFans()
    }
  },
  // 进行关注 
  doFans() {
    if (app.checkLogin()) {
      return
    }
    ProductApi.doFans(this.data.id)
      .then(res => {
        if (res.state === 200) {
          wx.showToast({
            title: '关注成功',
            icon: 'none'
          })
          this.setData({
            isFollow: true
          })
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none'
          })
        }
      })

  },
  // 取消关注 
  doFansCancel() {
    if (app.checkLogin()) {
      return
    }
    ProductApi.doFansCancel(this.data.id)
      .then(res => {
        if (res.state === 200) {
          wx.showToast({
            title: '取消关注',
            icon: 'none'
          })
          this.setData({
            isFollow: false
          })
        }
      })
  },
  // 查看是否已关注 
  doFansCheck(fId) {
    if (app.checkLogin()) {
      return
    }
    ProductApi.doFansCheck(fId)
      .then(res => {
        this.setData({
          isFollow: res.data
        })
      })
  },

  goPath(e) {
    const { path } = e.currentTarget.dataset
    wx.navigateTo({
      url: path
    })
  },
})