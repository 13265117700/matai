import {
  Mall
} from '../../../../api/design/mall'
const MallApi = new Mall()
const app = getApp()
Page({

  data: {
    tabs: [{
        id: 1,
        name: '全部',
        status: ''
      },
      {
        id: 2,
        name: '待付款',
        status: 1
      },
      {
        id: 3,
        name: '已报名',
        status: 2
      },
      // {
      //   id: 4,
      //   name: '待收货',
      //   status: 3
      // },
      {
        id: 5,
        name: '已完成',
        status: 4
      }, // 
    ],
    currentTab: '全部',
    rules: {
      page: 1,
      rows: 10,
      activity: 1, // 0 普通商品 1活动商品
      status: '', // 1.待付款 2.待发货 3.已发货 4.已完成 5.维权中
    },
    list: [],
    canDown: true,
    showNoData: false
  },

  onLoad: function (options) {
    const { status } = options
    app.sssssssss()
    if (status) {
      const { tabs } = this.data
      let o = tabs.find(item => item.status == status)

      this.setData({
        "rules.status": status,
        currentTab: o.name
      }, ()=> {
        this.getOrderList()
      })
    } else {
      this.getOrderList()
    }
  },
  // 获取订单列表
  getOrderList() {
    let list = this.data.list
    MallApi.fetchOrderList(this.data.rules)
      .then(res => {
        const {
          rows
        } = res.data
        if (rows.length) {
          list = list.concat(rows)
          this.setData({
            list
          })
        } else {
          this.setData({
            showNoData: true,
            canDown: false
          })
        }
      })
  },
  tabChange(e) {
    const {
      status,
      name
    } = e.currentTarget.dataset
    let rules = this.data.rules
    rules.page = 1
    rules.status = status

    this.setData({
      canDown: true,
      list: [],
      rules,
      showNoData: false,
      currentTab: name
    }, () => {
      this.getOrderList()
    })
  },
  onReachBottom() {
    if (!this.data.canDown) {
      return
    }
    let rules = this.data.rules
    rules.page = ++rules.page
    this.setData({
      rules
    }, () => {
      this.getOrderList()
    })
  },
  goPath(e) {
    const { path } = e.currentTarget.dataset
    wx.navigateTo({
      url: path
    })
  },
  back() {
    wx.navigateBack()
  }
})