import {
  Transaction
} from '../../../../../api/design/transaction'
const TransactionApi = new Transaction()
const app = getApp()
Page({
  data: {
    // orderType 类型:1.分销 2.会员组购买 3.商城 4.学院 5.购买设计 6.余额充值 7.余额提现 8.后台余额变动 9.出售作品 10.共享分购买
    tabs: [{
        id: 1,
        name: '全部',
        orderType: ''
      },
      {
        id: 6,
        name: '作品购买', // 购买设计
        orderType: 5
      },
      {
        id: 10,
        name: '作品出售',
        orderType: 9
      },
      {
        id: 2,
        name: '分销',
        orderType: 1
      },
      {
        id: 3,
        name: '会员组购买',
        orderType: 2
      },
      {
        id: 5,
        name: '学院',
        orderType: 4
      },
      {
        id: 4,
        name: '商城',
        orderType: 3
      },
      {
        id: 7,
        name: '余额充值',
        orderType: 6
      },
      {
        id: 8,
        name: '余额提现',
        orderType: 7
      },
      {
        id: 11,
        name: '共享分购买',
        orderType: 10
      },
      {
        id: 9,
        name: '平台奖励', // 后台余额变动
        orderType: 8
      },
    ],
    currentTab: '全部',
    list: [],
    rules: {
      page: 1,
      rows: 10,
      orderType: '', // 待付款 已关闭 已完成 4维权中
    },
    // orderType 类型:1.分销 2.会员组购买 3.商城 4.学院 5.购买设计 6.余额充值 7.余额提现 8.后台余额变动 9.出售作品 10.共享分购买
    iconList: [
      '',
      '/images/icon/my/transaction/dfx@2x.png',
      '/images/icon/my/transaction/v@2x.png',
      '/images/icon/my/transaction/sc@2x.png', // 商城
      '/images/icon/my/transaction/sc@2x.png', // 学院
      '/images/icon/my/transaction/zpgm@2x.png', // 购买设计
      '/images/icon/my/transaction/cz@2x.png', // 余额充值
      '/images/icon/my/transaction/tx@2x.png', // 余额提现
      '/images/icon/my/transaction/qt@2x.png', // .后台余额变动 其它
      '/images/icon/my/transaction/cszp@2x.png', 
      '/images/icon/my/transaction/sc@2x.png',
    ],
    canDown: true,
    showNoData: false
  },

  onLoad: function (options) {
    app.sssssssss()
    const { orderType } = options
    if (orderType) {
      let rules = {
        page: 1,
        rows: 10,
        orderType: 1
      }
      this.getOrderList(rules)
      this.setData({
        currentTab: '分销'
      })
    } else {
      this.getOrderList()
    }
  },
  // 获取订单列表
  getOrderList(rules) {
    let list = this.data.list
    rules = rules ? rules : this.data.rules
    TransactionApi.fetchList(rules)
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
      orderType,
      name
    } = e.currentTarget.dataset
    let rules = this.data.rules
    rules.page = 1
    rules.orderType = orderType

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