import {
  Vip
} from '../../../../api/design/vip'
import {
  GetOpenid
} from '../../../../api/design/getOpenid'
const GetOpenidApi = new GetOpenid()
const VipApi = new Vip()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    collegeList: [],
    list: [],
    rules: {
      page: 1,
      rows: 100
    },
    current: 0,
    orderInfo: {},
    userInfo: {},
    powerList: [{
        name: '成为合伙人',
        subName: '推荐会员分润',
        icon: 'http://csyimg.oss-cn-shenzhen.aliyuncs.com/images/2020/07/23/15954926020473469.png'
      },
      {
        name: '共享素材',
        subName: '免费下载',
        icon: 'http://csyimg.oss-cn-shenzhen.aliyuncs.com/images/2020/07/23/15954925719568164.png'
      },
      {
        name: '字库',
        subName: '永久授权使用',
        icon: 'http://csyimg.oss-cn-shenzhen.aliyuncs.com/images/2020/07/23/15954926364871894.png'
      },
      {
        name: '课程',
        subName: '部分课程免费学习',
        icon: 'http://csyimg.oss-cn-shenzhen.aliyuncs.com/images/2020/07/23/15954926194852417.png'
      },
      {
        name: '活动',
        subName: '享8折优惠',
        icon: 'http://csyimg.oss-cn-shenzhen.aliyuncs.com/images/2020/07/23/15954925858765132.png'
      },
      {
        name: '分润',
        subName: '优先发放',
        icon: 'http://csyimg.oss-cn-shenzhen.aliyuncs.com/images/2020/07/23/15954925582619849.png'
      }
    ],
    modalHide: true,
    payType: 1,
    showBuyModal: false,
    showLog: false
  },

  onLoad: function () {
    app.sssssssss()
    this.getList()
    this.getOrderList()
    this.setData({
      userInfo: app.g.userInfo
    })
  },
  back() {
    wx.navigateBack()
  },
  // 查看会员组列表
  getList() {
    wx.showLoading({
      title: ''
    })
    VipApi.fetchList(this.data.rules)
      .then(res => {
        wx.hideLoading()
        let {
          rows
        } = res.data
        if (rows.length) {
          // rows.reverse()
          this.setData({
            collegeList: rows,
            current: rows[0].id
          })
          this.getOrder(rows[0].id)
        }
      })
  },
  // 查看是否有该会员组的订单
  getOrder(id) {
    VipApi.fetchOrder(id)
      .then(res => {
        const {
          rows
        } = res.data
        if (rows.length) {
          this.setData({
            orderInfo: rows[0]
          })
        } else {
          // 没有的时候 去创建订单
          VipApi.createOrder(id)
            .then(res => {
              this.setData({
                orderInfo: res.data
              })
            })
        }
      })
  },
  setCurrent(e) {
    const {
      id
    } = e.currentTarget.dataset || e.target.dataset
    this.setData({
      current: id
    })
    this.getOrder(id)
  },

  showPayType() {
    this.setData({
      showBuyModal: true
    })
  },
  // 发起支付
  toPay() {
    // 微信支付
    if (this.data.payType == 1) {
      let {
        orderId
      } = this.data.orderInfo
      wx.showLoading({
        title: '',
        mask: true
      })
      // 1. 获取openid
      GetOpenidApi.getOpenid()
        .then(openid => {
          this.setData({
            showBuyModal: false
          })
          VipApi.wxPay({
              openid,
              orderId
            })
            .then(wxData => {
              wx.hideLoading()
              wx.requestPayment({
                ...wxData.data,
                success: () => {
                  // 支付成功
                  this.setData({
                    modalHide: false
                  })
                  app.getServerUserInfo()
                },
                fail: function (err) {
                  // 支付失败
                  wx.showToast({
                    title: '购买取消',
                    icon: 'none'
                  })
                }
              })
            })
        })
    } else {
      // 余额支付
      console.log('余额支付')
      const {
        userInfo,
        orderInfo
      } = this.data

      // if (userInfo.balance < orderInfo.orderPrice) {
      //   this.setData({
      //     showBuyModal: false
      //   })
      //   return wx.showToast({
      //     title: '余额不足',
      //     icon: 'none'
      //   })
      // }
      // 执行余额支付操作

      VipApi.payBuyBalance({
          id: orderInfo.orderId
        })
        .then(res => {
          console.log(res)
          if (res.state == 200) {
            this.setData({
              showBuyModal: false,
              modalHide: false
            })
            app.getServerUserInfo()
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
          }
        })
    }

  },

  goPath(e) {
    const {
      path
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: path
    })
  },
  /**
   * 添加支付方式切换后
   */
  bindChange(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      payType: index
    })
  },
  closePayType() {
    this.setData({
      showBuyModal: false,
      showLog: false
    })
  },
  notDo() {
    return false
  },
  bindShowLog() {
    this.setData({
      showLog: true
    })
  },
  // 获取订单列表
  getOrderList() {
    let list = this.data.list
    let rules = {
      page: 1,
      rows: 50,
      status: 3, // 1.待付款 2.待发货 3.已发货 4.已完成 5.维权中
    }
    VipApi.fetchOrderList(rules)
      .then(res => {
        const {
          rows
        } = res.data
        if (rows.length) {
          list = list.concat(rows)
          this.setData({
            list
          })
        }
      })
  },
})