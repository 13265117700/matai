import {
  ADPicture
} from '../../../api/design/find'
const AdApi = new ADPicture()
import {
  Mall
} from '../../../api/design/mall'
const MallApi = new Mall()
const app = getApp()

Component({
  properties: {
    toShow: {
      type: Boolean,
      value: false
    }
  },
  pageLifetimes: {
    show() {
      if (this.data.toShow) {
        this.checkCart()
      }
    }
  },
  observers: {
    toShow: function() {
      // 当show为true并且list为空的时候才去请求列表 意思是初始化时只请求一次列表
      if (this.data.toShow && !this.data.list1.length) {
        this.getAdList()
        this.getList()
        this.getList2()
        this.getList3()
        this.checkCart()
      }
    }
  },
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
      fatherAndSon: 1,
      rows: 6
    },
    canDown: true,
    cartHaveData: ''
  },
  methods: {
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
    onRe() {
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
  }
})
