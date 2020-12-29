import {
  Order
} from '../../../../api/design/order'
const OrderApi = new Order()
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
        name: '已完成',
        status: 3
      },
      {
        id: 4,
        name: '已取消',
        status: 2
      }
    ],
    currentTab: '全部',
    rules: {
      page: 1,
      rows: 10,
      status: '', // 待付款 已关闭 已完成 4维权中
    },
    list: [],
    canDown: true,
    showNoData: false
  },

  onLoad: function () {
    app.sssssssss()
    this.getOrderList()
  },
  // 获取订单列表
  getOrderList() {
    let list = this.data.list
    OrderApi.fetchList(this.data.rules)
      .then(res => {
        const {
          rows
        } = res.data
        console.log(res)
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