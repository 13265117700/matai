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
    address: {},
    addressList: [],
    userInfo: null,
    payType: '1',
    totalPrice: 0,
    list: [],
    totalSharePoints: 0
  },

  onLoad: function () {
    const list = wx.getStorageSync('cartList')
    if (!list) {
      return wx.switchTab({
        url: '/pages/index/index'
      })
    }
    this.setData({
      list
    }, () => {
      this.setPrice()
    })
  },
  // 设置显示价格
  setPrice() {
    let { list } = this.data
    let totalPrice = 0
    let totalSharePoints = 0
    for (let i = 0; i < list.length; i++) {
      if (list[i].checked) {
        totalPrice += list[i].price * list[i].num
        totalSharePoints += list[i].sharePoint * list[i].num
      }
    }
    
    this.setData({
      totalPrice,
      totalSharePoints
    })
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

  // 创建订单
  createOrder() {
    const {
      address: {
        id: addressId
      },
      list,
      userInfo,
      payType,
      totalPrice,
      totalSharePoints
    } = this.data
    if (!addressId) {
      wx.navigateTo({
        url: '../address/address',
      })
    }
    let detailedWorks = []
    let shoppingCartSid = []
    for (let i = 0; i < list.length; i++) {
      let goods = `${list[i].goodsId}|${list[i].num}`
      detailedWorks.push(goods)
      shoppingCartSid.push(list[i].id)
    }

    let data = {
      detailedWorks: detailedWorks.toString(),
      shippingAddressId: addressId,
      shoppingCartSid: shoppingCartSid.toString()
    }

    console.log(data)


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
        console.log('余额支付完成', res)
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