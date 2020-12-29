import {
  Mall
} from '../../../../api/design/mall'
const MallApi = new Mall()
import {
  GetOpenid
} from '../../../../api/design/getOpenid'
const GetOpenidApi = new GetOpenid()
const app = getApp()

Page({
  data: {
    info: {},
    id: 0,
    num: 0,
    address: {},
    addressList: [],
    isCx: false,
    userInfo: null,
    payType: '1'
  },

  onLoad: function (options) {
    const {
      id,
      num
    } = options
    this.setData({
      id,
      num
    })
    this.fetchInfo(id)
  },

  onShow() {
    let o = wx.getStorageSync('shopAddress')
    const userInfo = app.g.userInfo
    if (o) {
      this.setData({
        address: o
      })
    } else {
      this.getAddressList()
    }
    this.setData({
      userInfo
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
  getAddressList() {
    MallApi.fetchAddressList({
        page: 1,
        rows: 1000
      })
      .then(res => {
        const {
          rows: list
        } = res.data
        if (list.length) {
          let o = list.find(item => item.defaultAddress == 1)
          if (o) {
            this.setData({
              address: o
            })
          }
        }
      })
  },
  onUnload() {
    wx.removeStorageSync('shopAddress')
  },

  fetchInfo(id) {
    MallApi.fetchInfo(id)
      .then(res => {
        console.log(res)
        if (res.state == 200) {
          let data = res.data
          this.setCuxiao(data.promotionStartTime, data.promotionEndTime)
          this.setData({
            info: data
          })
        }
      })
  },
  // 促销设置
  setCuxiao(startTime, endTime) {
    let t1 = app.utils.GetRTime(startTime)
    let t2 = app.utils.GetRTime(endTime)
    if (!t1 && t2) {
      // 促销开始了
      this.setCuxiaoCountDown(startTime, endTime)
    }
  },
  // 设置促销倒计时
  setCuxiaoCountDown(startTime, endTime) {
    let timer = setInterval(() => {
      let t2 = app.utils.GetRTime(endTime)
      if (!t2) {
        this.setData({
          isCx: false
        })
        clearInterval(timer)
      } else {
        this.setData({
          isCx: true,
          cxTime: t2.split(':')
        })
      }
    }, 1000)
  },

  // 创建订单
  createOrder() {
    const {
      address: {
        id: addressId
      },
      info,
      num,
      userInfo,
      isCx,
      payType
    } = this.data
    if (!addressId) {
      wx.navigateTo({
        url: '../address/address',
      })
    }

    let data = {
      detailedWorks: `${info.id}|${num}`,
      shippingAddressId: addressId
    }

    // 需要检查用户积分是否足够
    let price = 0
    let sharePoint = 0
    let uMoney = userInfo.balance
    let uSharePoint = userInfo.integral
    
    // 促销价格
    if (isCx) {
      price = info.salePrice * num
      sharePoint = info.saleSharePrice * num
    } else {
      // 非促销价格
      price = info.commodityPrice * num
      sharePoint = info.sharePrice * num
    }

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
      this.payBuyBalance(data, payType, price, sharePoint)

    } else {
      wx.showLoading({
        title: '',
      })      
      // 拉起微信支付
      this.payBuyBalance(data, payType, price, sharePoint, 1)
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
                url: `../payStatus/payStatus?orderId=${orderId}&payType=${payType}&price=${price}&sharePoint=${sharePoint}`,
              })
            },
            fail: function (err) {
              // 取消支付
              wx.navigateTo({
                url: `../payStatus/payStatus?orderId=${orderId}&payType=${payType}&price=${price}&sharePoint=${sharePoint}&payStatus=fail`,
              })
            }
          })
        })
      })
  },
  // 生成订单并支付
  payBuyBalance(data, payType, price, sharePoint, isWxPay) {
    MallApi.createOrder(data)
      .then(res => {
        console.log('生成订单', res)
        if (res.state == 200) {
          // 烦, 去查一遍订单列表, 取最新一个订单
          this.getOrderList(payType, price, sharePoint, isWxPay)
        }
      })
  },
  // 查最新的订单
  getOrderList(payType, price, sharePoint, isWxPay) {
    MallApi.fetchOrderList({page: 1,rows: 1})
      .then(res => {
        console.log(res)
        if (res.state == 200) {
          let orderId = res.data.rows[0].orderId
          if (isWxPay) {
            this.wxOrder(orderId, payType, price, sharePoint)
          } else {
            this.payBalance(orderId, payType, price, sharePoint)
          }
        }
      })
  },
  // 嗨，使用余额支付
  payBalance(orderId, payType, price, sharePoint) {
    MallApi.payBuyBalance({id: orderId})
      .then(res => {
        wx.hideLoading()
        wx.navigateTo({
          url: `../payStatus/payStatus?orderId=${orderId}&payType=${payType}&price=${price}&sharePoint=${sharePoint}`,
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