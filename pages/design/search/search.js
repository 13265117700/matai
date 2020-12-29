import {
  Product
} from '../../../api/design/product.js'
const coll = new Product()
const app = getApp()


Page({

  data: {
    list: [],
    history: [],
    lisss: 1,
    rules: {
      page: 1,
      rows: 10,
      classification: 1,
      keyword: "",
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.sssssssss()
    let _this = this;
    wx.getStorage({
      key: 'searched2',
      success: function(res) {
        console.log(res)
        let history = res.data;
        _this.setData({
          history,
        })
      },
    })
    
  },
  // 列表分享 
  onShareAppMessage(e) {
    return app.utils.doShare(e, null, app)
  },
  onsearchInput(e) {
    let _this = this;

    let value = e.detail.value;
    let history = _this.data.history;
    _this.setData({ //调用搜索接口
      "rules.keyword": value,
      list: [],
      "rules.page": 1,
      lisss: 0,
    }, () => {
      this.getList() //更新data数据
    })

    history.push({
      title: value
    })
    // 对点击后的数据做缓存,之后显示在历史记录上
    wx.setStorage({
      key: 'searched2',
      data: history,
      success(res) {
        console.log(`保存成功 `)
      }
    })



  },



  onclear() {
    let _this = this;
    wx.removeStorage({
      key: 'searched2',
      success: function (res) {

      },
    });
    _this.setData({
      history: []
    })
  },

  huanss(e) {
    var title = e.currentTarget.dataset.title;
    this.setData({ //调用搜索接口
      "rules.keyword": title,
      lisss: 0,
    }, () => {
      this.getList() //更新data数据
    })
  },



  getList(e) {
    let list = this.data.list
    if (app.g.userInfo) {
      coll.fetchList2(this.data.rules)
      .then(res => {
        let rows = res.data.rows
        if (rows.length) {
          list = list.concat(rows)
          this.setData({
            list
          })
        }
      })
    } else {
      coll.fetchList(this.data.rules)
      .then(res => {
        let rows = res.data.rows
        if (rows.length) {
          list = list.concat(rows)
          this.setData({
            list
          })
        }
      })
    }

  },

  onReachBottom: function (e) {
    let rules = this.data.rules
    this.setData({
      "rulesl.page": ++rules.page,
    }, () => {
      this.getList()
    })
  },
    // 点赞或取消点赞作品
    doLike(e) {
      if (app.checkLogin()) {
        return
      }

      let {
        id,
        status
      } = e.currentTarget.dataset
      let {
        list
      } = this.data
      let info = {}
      info = list.find(item => item.id == id)
      if (status) {
        info.likeStatus = false
        info.likeCounts = --info.likeCounts
        coll.cancelPointPraise(id)
          .then(() => {
            this.setData({
              list
            })
          })
      } else {
        info.likeStatus = true
        info.likeCounts = ++info.likeCounts
        coll.doPointPraise(id)
          .then(() => {
            this.setData({
              list
            })
          })
      }
    },
    // 收藏或取消收藏作品
    doColl(e) {
      if (app.checkLogin()) {
        return
      }

      let {
        id,
        status
      } = e.currentTarget.dataset
      let {
        list
      } = this.data
      let info = {}
      info = list.find(item => item.id == id)
      if (status) {
        info.collectionStatus = false
        info.collectionTimes = --info.collectionTimes
        coll.cancelColl(id)
          .then(() => {
            this.setData({
              list
            })
          })
      } else {
        info.collectionStatus = true
        info.collectionTimes = ++info.collectionTimes
        coll.doColl(id)
          .then(() => {
            this.setData({
              list
            })
          })
      }
    },
    goPath(e) {
      const {
        path
      } = e.currentTarget.dataset
      if (path) {
        wx.navigateTo({
          url: path
        })
      }
    },
})