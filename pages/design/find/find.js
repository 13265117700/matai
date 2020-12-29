import {
  ADPicture
} from '../../../api/design/find'
const AdApi = new ADPicture()
import {
  Product
} from '../../../api/design/product'
const ProductApi = new Product();
import {
  Mall
} from '../../../api/design/mall'
const MallApi = new Mall();

const app = getApp()

Page({
  data: {
    // 以下为临时
    adRules: {
      page: 1,
      rows: 5,
      advertisingColumnId: 8
    },
    adList: [],
    designTags: [],
    tagRules: {
      page: 1,
      rows: 6,
      advertisingColumnId: 6
    },
    collegeList: [],
    list: [],
    eventList: [],
    mallList: [],
    Shinjitunopage: false,
    showSwiper:false,
    showDesignTag:false
  },
  onLoad() {
    this.getList()
    this.getTagList()
    this.getCollegeList()
    this.getColumnList()
    this.getMallList()
  },

  getList() {
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
  getMallList() {
    MallApi.fetchList({page: 1, rows: 10, sortType: 4})
      .then(res => {
        const {
          rows: list
        } = res.data
        this.setData({
          mallList: list
        })
      })
  },
  getTagList() {
    AdApi.fetchList(this.data.tagRules)
      .then(res => {
        const {
          rows: list
        } = res.data
        for (let i = 0; i < list.length; i++) {
          let s = list[i].name.split('|')
          list[i].name1 = s[0]
          list[i].name2 = s[1]
        }
        this.setData({
          designTags: list
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
  goSwitch(e) {
    const {
      path
    } = e.currentTarget.dataset
    if (path) {
      wx.switchTab({
        url: path
      })
    }
  },
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

    let rules = {
      page: 1,
      rows: 3
    }
    ProductApi.fetchEventList(rules)
      .then(res => {
        const {
          rows: list
        } = res.data
        let l = this.data.list
        for (let i = 0; i < list.length; i++) {
          let o = l.find(item => item.id == list[i].columnId)
          if (o) {
            list[i].t = o.name
          }
        }
        this.setData({
          eventList: list
        })
      })
  },

  scroll(e) {
    console.log(e)
  },
  // 列表分享 
  onShareAppMessage(e) {
    return app.utils.doShare(e, null, app)
  },
  onShow() {
    let Shinjitunopage = Boolean(wx.getStorageSync('app'))
    this.setData({
      Shinjitunopage
    })
    ProductApi.getGlobalSettings().then(res => {
      let appletPaymentSwitch = res.data.appletPaymentSwitch;
      if(appletPaymentSwitch === 1){
        this.setData({
          showSwiper:true
        })
      }
    })
  },
})