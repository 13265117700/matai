import {
  Order
} from '../../../../../api/design/order'
const OrderApi = new Order()
const app = getApp()
Page({

  data: {
    id: 0,
    status: 1,
    info: {}
  },

  onLoad: function (options) {
    app.sssssssss()
    const { id, status } = options
    this.setData({
      id,
      status
    }, ()=> {
      this.getOrderInfo()
    })
  },
  // 获取订单详情
  getOrderInfo() {
    OrderApi.fetchInfo(this.data.id)
      .then(res => {
        console.log(res)
        this.setData({
          info: res.data
        })
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