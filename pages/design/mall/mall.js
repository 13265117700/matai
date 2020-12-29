import {
  ADPicture
} from '../../../api/design/find'
const AdApi = new ADPicture()
import {
  Mall
} from '../../../api/design/mall'
const MallApi = new Mall()
const app = getApp()

Page({
  data: {
    adList: [],
    adRules: {
      page: 1,
      rows: 5,
      advertisingColumnId: 9
    },
    list1: [], // 精选
    list2: [], // 推荐
    list3: [], // 普通
    list3Rules: {
      page: 1,
      rows: 6,
      fatherAndSon: 1
    },
    canDown: true,
    cartHaveData: ''
  },

  onLoad: function (options) {
    this.getAdList()
    this.getList()
    this.getList2()
    this.getList3()
  },
  onPullDownRefresh() {

    this.setData({
      list1: [],
      list2: [],
      list3: [],
    }, () => {
      this.getAdList()
      this.getList()
      this.getList2()
      this.getList3()
    })
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 2000);
  },

  onShow() {
    this.checkCart()

    let Shinjitunopage = Boolean(wx.getStorageSync('app'))
    console.log(Shinjitunopage)
    let title = Shinjitunopage ? '商城' : '案例中心'
    console.log(title)
    wx.setNavigationBarTitle({
      title
    })
    if (!Shinjitunopage) {
      wx.showLoading({
        title: '',
      })
      setTimeout(() => {
        wx.hideLoading()
        wx.navigateTo({
          url: './homepage/homepage',
        })
      }, 1000)
    }
    this.setData({
      Shinjitunopage
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
  goAuthPath(e) {
    if (app.checkLogin()) {
      return
    }
    const { path } = e.currentTarget.dataset
    if (path) {
      wx.navigateTo({
        url: path
      })
    }
  },
  getAdList() {
    AdApi.fetchList(this.data.adRules)
      .then(res => {
        const {
          rows: list
        } = res.data
        this.setData({
          adList: list
        })
      })
  },
  checkCart() {
    if (app.checkLogin(1)) {
      return
    }
    MallApi.fetchCart({page: 1, rows: 1})
      .then(res=> {
        let cartHaveData = ''
        if (res.data.total) {
          cartHaveData = 'gwc'
        }
        this.setData({
          cartHaveData
        })
      })
  },
  getList() {
    MallApi.fetchList({
        page: 1,
        rows: 5,
        fatherAndSon: 1,
        sortType: 2
      })
      .then(res => {
        const {
          rows: list
        } = res.data
        this.setData({
          list1: list
        })
      })
  },
  getList2() {
    MallApi.fetchList({
        page: 1,
        rows: 5,
        fatherAndSon: 1,
        sortType: 3
      })
      .then(res => {
        const {
          rows: list
        } = res.data
        this.setData({
          list2: list
        })
      })
  },
  getList3() {
    let {
      list3,
      list3Rules
    } = this.data
    MallApi.fetchList(list3Rules)
      .then(res => {
        const {
          rows
        } = res.data
        if (rows.length) {
          this.setData({
            list3: list3.concat(rows)
          })
        } else {
          this.setData({
            canDown: false
          })
        }
      })
  },

  onReachBottom() {
    let { list3Rules, canDown } = this.data
    if(canDown) {
      list3Rules.page = ++list3Rules.page
      this.setData({
        list3Rules
      }, () => {
        this.getList3()
      })
    }
  },
  onShareAppMessage(e) {
    return app.utils.doShare(e, null, app)
  },
})