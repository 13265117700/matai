import {
  Product
} from '../../../api/design/product'
const ProductApi = new Product();
import {
  Mall
} from '../../../api/design/mall'
const MallApi = new Mall()
const app = getApp()

Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    }
  },
  observers: {
    show: function () {
      // 当show为true并且list为空的时候才去请求列表 意思是初始化时只请求一次列表
      if (this.data.show && !this.data.list.length) {
        this.getFirstList()
        this.getCollegeList()
        this.getMallList()
      }
      let isShow = Boolean(wx.getStorageSync('app'))
      this.setData({
        isShow
      })
    }
  },
  // pageLifetimes: {
  //   show() {
  //     const { show, list } = this.data
  //     if (show && list.length) {
  //       this.setData({
  //         rules: {
  //           page: 1,
  //           rows: 10,
  //           classification: 1, // 1为设计 2为字体
  //           // pushHome: 1, // 是否推送 暂时按照推送排序就行
  //           sortType: 3 // 小程序推送排序
  //         },
  //         list: [],
  //         list2: [],
  //         insertGoods: 0
  //       }, () => {
  //         this.getFirstList()
  //         this.getMallList()
  //       })
  //     }
  //   }
  // },
  data: {
    list: [],
    list2: [],
    rules: {
      page: 1,
      rows: 10,
      classification: 1, // 1为设计 2为字体
      // pushHome: 1, // 是否推送 暂时按照推送排序就行
      sortType: 3 // 小程序推送排序
    },
    collegeList: [],
    isShow: false,
    canDown: 1,
    goodsList: [], // 商品列表
    insertGoods: 0, // 设计作品列表已插入商品数
  },

  methods: {
    isLogin() {
      let userInfo = app.g.userInfo
      if (!userInfo) {
        app.asyncUserInfo = res => {
          if (res) {
            let userInfo = res
            this.setData({
              userInfo
            })
            this.getList()
          }
        }
      } else {
        this.setData({
          userInfo,
        })
        this.getList()
      }
    },

    // 上拉加载更多
    onRe() {
      let { canDown, rules } = this.data
      if (canDown) {
        rules.page = ++rules.page
        this.setData({
          rules
        }, () => {
          this.getList()
        })
      }
    },
    /**
     * 获取商品列表
     */
    getMallList() {
      MallApi.fetchList({ page: 1,rows: 10, sortType: 3, fatherAndSon: 1 })
        .then(res => {
          console.log('mall', res.data)
          let Shinjitunopage = Boolean(wx.getStorageSync('app'))
          if (res.state == 200 && res.data) {
            let list = res.data.rows
            for (let i = 0; i < list.length; i++) {
              list[i].type = 'goods'
            }
            if (!Shinjitunopage) {
              list = []
            }
            this.setData({
              goodsList: list
            }, () => {
              this.getList()
            })
          }
        })
    },
    /**
     * 查询作品列表 2层
     */

    getList() {
      let { list2, goodsList, insertGoods } = this.data
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
            // 初次请求 删除前2项
            if (!list2.length) {
              list.shift()
              list.shift()
            }
            for (let i = 0; i < list.length; i++) {
              list[i].diff = app.utils.getDateDiff(list[i].updateTime)
            }
            if (goodsList.length > insertGoods) {
              list.push(goodsList[insertGoods])
              insertGoods++
            }
            wx.hideLoading()
            this.setData({
              canDown: list.length,
              list2: list2.concat(list),
              insertGoods
            })
          })
      } else {
        ProductApi.fetchList(this.data.rules)
          .then(res => {
            const {
              rows: list
            } = res.data
            // 初次请求 删除前2项
            if (!list2.length) {
              list.shift()
              list.shift()
            }
            for (let i = 0; i < list.length; i++) {
              list[i].diff = app.utils.getDateDiff(list[i].updateTime)
            }
            if (goodsList.length > insertGoods) {
              list.push(goodsList[insertGoods])
              insertGoods++
            }
            wx.hideLoading()
            this.setData({
              canDown: list.length,
              list2: list2.concat(list),
              insertGoods
            })
          })
      }
    },
    // 查第一层数据需要的列表
    getFirstList() {
      const tokens = app.g.tokens
      if (tokens) {
        ProductApi.fetchList2({
          page: 1,
          rows: 2,
          classification: 1, // 1为设计 2为字体
          // pushHome: 1, // 是否推送 暂时只按推荐排序即可
          sortType: 3 // 小程序推送排序
        })
          .then(res => {
            const {
              rows
            } = res.data
            for (let i = 0; i < rows.length; i++) {
              rows[i].diff = app.utils.getDateDiff(rows[i].updateTime)
            }
            this.setData({
              list: rows
            })
          })
      } else {
        ProductApi.fetchList({
          page: 1,
          rows: 2,
          classification: 1, // 1为设计 2为字体
          pushHome: 1, // 是否推送
          sortType: 3 // 小程序推送排序
        })
          .then(res => {
            const {
              rows
            } = res.data
            for (let i = 0; i < rows.length; i++) {
              rows[i].diff = app.utils.getDateDiff(rows[i].updateTime)
            }
            this.setData({
              list: rows
            })
          })
      }
    },

    // 查询作品列表结束
    // 查学院课程列表
    getCollegeList() {
      let rules = {
        page: 1,
        rows: 6
      }
      ProductApi.fetchCollgeList(rules)
        .then(res => {
          this.setData({
            collegeList: res.data.rows
          })
        })
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
  }
})
