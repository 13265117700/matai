import {
  WithDrawal
} from '../../../../api/design/withdrawal'
const WithDrawalApi = new WithDrawal()
const app = getApp()

Page({
  data: {
    userInfo: {},
    tabList: [
      { name: '交易明细', icon: '/images/icon/my/wallet/jymx@2x.png', path: '/pages/design/my/wallet/transaction/transaction' }, // transaction
      { name: '提现明细', icon: '/images/icon/my/wallet/txmx@2x.png', path: '/pages/design/my/wallet/txLog/txLog' },
      { name: '充值明细', icon: '/images/icon/my/wallet/czmx@2x.png', path: '/pages/design/my/wallet/czLog/czLog' },
      { name: '我要提现', icon: '/images/icon/my/wallet/tx@2x.png', path: '/pages/design/my/withdrawal/withdrawal' },
      { name: '收款账号', icon: '/images/icon/my/wallet/skzh@2x.png', path: '/pages/design/my/wallet/account/account' },
      { name: '余额充值', icon: '/images/icon/my/wallet/yecz@2x.png', path: '/pages/design/my/wallet/charge/charge' },
    ],
    price1: 0, // 放款中
    price2: 0 // 提现成功
  },
  onLoad() {
    this.getOrderList()
  },

  onShow() {
    app.sssssssss()
    this.setData({
      userInfo: app.g.userInfo
    })
  },
  back() {
    wx.navigateBack()
  },

  goPath(e) {
    const { path } = e.currentTarget.dataset
    wx.navigateTo({
      url: path
    })
  },
  // 获取订单列表
  getOrderList() {
    WithDrawalApi.fetchList({page: 1, rows: 10000})
      .then(res => {
        const {
          rows
        } = res.data
        let price1 = 0
        let price2 = 0
        for (let i = 0; i < rows.length; i++) {
          if (rows[i].status == 1) {
            price1 += rows[i].withdrawalAmount
          } else if (rows[i].status == 3) {
            price2 += rows[i].withdrawalAmount
          }
        }

        console.log(price1, price2)
        this.setData({
          price1,
          price2
        })
      })
  },
})