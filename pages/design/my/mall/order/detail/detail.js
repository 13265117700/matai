import {
  Mall
} from '../../../../../../api/design/mall'
const MallApi = new Mall()
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
      status: status || 1
    }, ()=> {
      this.getOrderInfo()
    })
  },
  onShow() {
    let  { info } = this.data
    if (info.id) {
      this.getOrderInfo()
    }
  },
  // 获取订单详情
  getOrderInfo() {
    MallApi.fetchOrderInfo({id: this.data.id})
      .then(res => {
        this.setData({
          info: res.data,
          status: res.data.status
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
  },
  copyText (e) {
    let {text} = e.currentTarget.dataset
    wx.setClipboardData({
      data: text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '单号复制成功'
            })
          }
        })
      }
    })
  }
})