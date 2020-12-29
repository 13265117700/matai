import {
  Mall
} from '../../../../api/design/mall'
const MallApi = new Mall()
const app = getApp()

Page({
  data: {
    userInfo: {},
    tabList: [{
        name: '待付款',
        path: './order/order?status=1',
        icon: '/images/shop/dfk01@2x.png'
      },
      {
        name: '待收货',
        path: './order/order?status=3',
        icon: '/images/shop/dsh01@2x.png'
      },
      {
        name: '待发货',
        path: './order/order?status=2',
        icon: '/images/shop/dfh01@2x.png'
      },
      {
        name: '全部订单',
        path: './order/order',
        icon: '/images/shop/wdqbdd@2x.png'
      },
    ],
    goodsList: []
  },
  onLoad: function (options) {
    let userInfo = app.g.userInfo
    if (!userInfo) {
      app.asyncUserInfo = res => {
        if (res) {
          let userInfo = res
          this.setData({
            userInfo,
          })
        }
      }
    } else {
      this.setData({
        userInfo,
      })
    }
    this.getGoodsList()
  },

  getGoodsList() {
    MallApi.fetchList({
        page: 1,
        rows: 10,
        fatherAndSon: 1,
        sortType: 4
      })
      .then(res => {
        console.log(res)
        if (res.state == 200) {
          this.setData({
            goodsList: res.data.rows
          })
        }
      })
  },

  back() {
    const pages = getCurrentPages()
    if (pages.length < 2) {
      wx.switchTab({
        url: '/pages/index/index',
      })
    } else {
      wx.navigateBack()
    }
  },
  goMall() {
    wx.switchTab({
      url: '/pages/design/mall/mall',
    })
  },

  goPath(e) {
    const {
      path
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: path
    })
  },

})