import {
  Product
} from '../../../api/design/product'
const ProductApi = new Product();
const app = getApp()

Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    }
  },
  observers: {
    show: function() {
      // 当show为true并且list为空的时候才去请求列表 意思是初始化时只请求一次列表
      if (this.data.show && !this.data.list.length) {
        this.getList()
      }
    }
  },
  // pageLifetimes: {
  //   show() {
  //     const { show, list } = this.data
  //     if (show && list.length) {
  //       this.setData({
  //         rules: {
  //           page: 1,
  //           rows: 20,
  //           classification: 1, // 1为设计 2为字体
  //         },
  //         list: []
  //       }, () => {
  //         this.getList()
  //       })
  //     }
  //   }
  // },
  data: {
    list: [],
    rules: {
      page: 1,
      rows: 20,
      classification: 1, // 1为设计 2为字体
    },
    canDown: 1
  },

  methods: {
    // 上拉加载更多
    onRe() {
      let { canDown, rules } = this.data
      if (canDown) {
        rules.page = ++ rules.page
        this.setData({
          rules
        }, () => {
          this.getList()
        })
      }
    },
    getList() {
      if (!app.g.userInfo) {
        return
      }
      wx.showLoading({
        title: '数据正在加载中',
        icon: 'none'
      })
      let {list} = this.data
      ProductApi.fetchFollowDesignerList(this.data.rules)
        .then(res => {
          wx.hideLoading()

          if (!res.data) {
            return
          }

          const {
            rows
          } = res.data
          let arr = []
          for (let i = 0; i < rows.length; i++) {
            if (rows[i].workInformation != 'fonts') {
              rows[i].diff = app.utils.getDateDiff(rows[i].updateTime)
              arr.push(rows[i])
            }
          }
          this.setData({
            canDown: rows.length,
            list: list.concat(arr)
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
    goCollege() {
      wx.switchTab({
        url: '/pages/college/college',
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
    },
  }
})
