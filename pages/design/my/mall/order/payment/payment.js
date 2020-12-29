import {
  Mall
} from '../../../../../../api/design/mall'
const MallApi = new Mall()
import {
  GetOpenid
} from '../../../../../../api/design/getOpenid'
const GetOpenidApi = new GetOpenid()
const app = getApp()

Page({
  data: {
    address: {},
    userInfo: null,
    payType: '1',
    totalPrice: 0,
    list: [],
    totalSharePoints: 0,
    id: 0
  },

  onLoad: function (options) {
    const userInfo = app.g.userInfo
     const { orderId: id } = options
     this.setData({
       id,
       userInfo
     }, () => {
       this.getOrderInfo()
     })
  },
  getOrderInfo() {
    const { id } = this.data
    MallApi.fetchOrderInfo({id})
      .then(res => {
        console.log('orderInfo', res)
        const { state, data } = res
        if (state == 200 && data) {
          this.setData({
            address: data.csPointsMallOrderAddress,
            list: data.csPointsMallOrderProducts,
            info: data,
            totalPrice: data.orderPrice,
            totalSharePoints: data.sharePrice
          })
        }
      })
  },
  // 创建订单
  createOrder() {
    const {
      id,
      userInfo,
      payType,
      totalPrice,
      totalSharePoints
    } = this.data
    // 需要检查用户积分是否足够
    let price = totalPrice
    let sharePoint = totalSharePoints
    let uMoney = userInfo.balance
    let uSharePoint = userInfo.integral

    // 1. 先查看共享分是否足够
    if (sharePoint > uSharePoint) {
      return wx.showModal({
        showCancel: false,
        content: '共享分不足'
      })
    }

    // 余额支付
    if (payType == '2') {
      // 对比用户余额是否足够
      if (price > uMoney) {
        return wx.showModal({
          showCancel: false,
          content: '余额不足'
        })
      }
      wx.showLoading({
        title: '',
      })
      console.log('余额足够')
      this.payBalance(id, payType, price, sharePoint)

    } else {
      wx.showLoading({
        title: '',
      })      
      // 拉起微信支付
      this.wxOrder(id, payType, price, sharePoint)
    }
  },
  
  // 拉起微信支付
  wxOrder(orderId, payType, price, sharePoint) {
    GetOpenidApi.getOpenid()
      .then(openid => {
        MallApi.wxPay({
          openid,
          orderId
        })
        .then(wxData => {
          wx.hideLoading()
          wx.requestPayment({
            ...wxData.data,
            success: () => {
              wx.navigateTo({
                url: `/pages/design/mall/payStatus/payStatus?orderId=${orderId}&payType=${payType}&price=${price}&sharePoint=${sharePoint}`,
              })
            },
            fail: function (err) {
              // 取消支付
              wx.showToast({
                title: '支付取消',
                icon: 'none'
              })
            }
          })
        })
      })
  },
  // 嗨，使用余额支付
  payBalance(orderId, payType, price, sharePoint) {
    MallApi.payBuyBalance({id: orderId})
      .then(res => {
        wx.hideLoading()
        wx.navigateTo({
          url: `/pages/design/mall/payStatus/payStatus?orderId=${orderId}&payType=${payType}&price=${price}&sharePoint=${sharePoint}`,
        })
        app.getServerUserInfo()
      })
  },

  bindChange(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      payType: index
    })
  },
})