import {
  Charge
} from '../../../../../api/design/charge'
const ChargeApi = new Charge()
const app = getApp()
Page({
  data: {
    tabs: [{
        id: 1,
        name: '全部',
        status: 3 // 暂时改变2 默认应该为 ''
      },
      // {
      //   id: 2,
      //   name: '待付款',
      //   status: 1
      // },
      {
        id: 3,
        name: '充值成功',
        status: 3
      }
    ],
    currentTab: '全部',
    rules: {
      page: 1,
      rows: 10,
      status: 3, // 1待付款 2已关闭 3已完成
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
    ChargeApi.fetchList(this.data.rules)
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