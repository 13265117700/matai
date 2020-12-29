import {
  Product
} from '../../../api/design/product'
import {
  Order
} from '../../../api/design/order'
const ProductApi = new Product()
const OrderApi = new Order()
const app = getApp()

Page({
  data: {
    info: {},
    list: [],
    isFans: false, // 是否已关注设计师
    isColl: false, // 是否已收藏该作品
    isLike: false, // 是否已点赞该作品
    commentList: [], // 评论列表
    commentRules: {
      page: 1,
      rows: 10,
      level: 1
    },
    // 二级评论需要的
    isShow: false,
    numbers: 0,
    nickName: '图可图',
    commentList2: [], // 评论列表
    commentRules2: {
      page: 1,
      rows: 10,
      level: 2
    },
    canDown2: true,
    SP: false,
    isFocus: false,
    text: '',
    buyShow: false, // 显示购买上拉框
    userInfo: null,
    Shinjitunopage: false,
    keyHeight: -20
  },

  onLoad: function (options) {
    app.sssssssss()
    let {
      id
    } = options
    // id = 1762
    this.getInfo(id)
    this.plusViewNumber(id)
    this.getColl(id)
    this.setData({
      "commentRules.designWorksId": id,
      "commentRules2.designWorksId": id,
      SP: Boolean(wx.getStorageSync('app'))
    }, () => {
      this.getCommentList()
    })
  },

  onShow() {
    let Shinjitunopage = Boolean(wx.getStorageSync('app'))
    this.setData({
      Shinjitunopage
    })
    this.setData({
      userInfo: app.g.userInfo
    })
  },

  // 获取2级评论列表
  getCommentList2() {
    let {
      commentList2
    } = this.data
    ProductApi.fetchComment(this.data.commentRules2)
      .then(res => {
        let {
          total,
          rows
        } = res.data
        if (rows.length) {
          commentList2 = commentList2.concat(rows)
          this.setData({
            isShow: true,
            commentList2,
            numbers: total
          })
        } else {
          this.setData({
            isShow: true,
            canDown2: false
          })
        }
      })
  },

  // 设置可修改范围

  nextPage() {
    if (!this.data.canDown2) {
      return
    }
    let {
      commentRules2
    } = this.data
    commentRules2.page = ++commentRules2.page
    this.setData({
      commentRules2
    })
    this.getCommentList2(commentRules2)
  },

  close() {
    this.setData({
      isShow: false,
      buyShow: false,
      canDown2: true,
      commentRules2: {
        page: 1,
        rows: 10,
        level: 2,
      },
      numbers: 0,
      commentList2: []
    })
  },
  open(e) {
    let {
      id
    } = e.currentTarget.dataset
    let {
      commentList
    } = this.data
    let o = commentList.find(item => item.id == id)
    this.setData({
      "commentRules2.topCommentId": id,
      nickName: o.csUser.nickName
    }, () => {
      this.getCommentList2()
    })
  },
  send(e) {
    if (app.checkLogin()) {
      return
    }
    let userInfo = app.g.userInfo
    let {
      commentList2,
      commentRules2
    } = this.data
    let d = new Date()
    let o = {
      evaluate: e.detail,
      id: d.getTime(),
      csUser: userInfo,
      createTime: app.utils.formatTimeAll(d)
    }
    ProductApi.doComment2({
        evaluate: e.detail,
        topCommentId: commentRules2.topCommentId
      })
      .then(res => {
        console.log('doComment2', res)
      })
    commentList2.push(o)
    this.setData({
      commentList2
    })
  },
  // 二级评论相关结束
  // 获取作品详情
  getInfo(id) {
    ProductApi.fetchInfo({
        id
      })
      .then(res => {
        let data = res.data
        data.details = data.details.replace(/\<img class=".*?"/g, '<img');
        data.details = data.details.replace(/\<img alt=".*?"/g, '<img');
        data.details = data.details.replace(/\<img style=".*?"/g, '<img');
        data.details = data.details.replace(/\<img/g, '<img style="max-width:100%;height:auto;display:block"');
        this.setData({
          info: data
        })
        let keyword = data.keyword.split(' ')[0]
        this.getList(keyword)
        this.doFansCheck(data.csUser.id)
      })
  },
  // 获取相关作品
  getList(keyword) {
    let rules = {
      page: 1,
      rows: 10,
      keyword,
      classification: 1 // 1为设计 2为字体
    }
    ProductApi.fetchList(rules)
      .then(res => {
        const {
          rows: list
        } = res.data
        this.setData({
          list
        })
      })
  },
  // 获取1级评论列表
  getCommentList() {
    ProductApi.fetchComment(this.data.commentRules)
      .then(res => {
        let {
          rows
        } = res.data
        if (rows.length) {
          this.setData({
            commentList: rows
          })
        }
      })
  },
  // 作品查看数+1
  plusViewNumber(id) {
    ProductApi.plusViewNumber(id)
  },
  // 查看是否已收藏和点赞该作品
  getColl(id) {
    if (app.checkLogin(1)) {
      return
    }
    ProductApi.getColl(id)
      .then(res => {
        let isColl = res.data

        // 查询是否已点赞该作品
        ProductApi.getPointPraise(id, app.g.userInfo.id)
          .then(res => {
            let isLike = res.data
            this.setData({
              isColl,
              isLike
            })
          })
      })
  },
  // 点赞或取消点赞作品
  doLike() {
    if (app.checkLogin()) {
      return
    }
    let {
      isLike,
      info
    } = this.data
    if (isLike) {
      ProductApi.cancelPointPraise(this.data.info.id)
        .then(() => {
          this.setData({
            isLike: !isLike,
            "info.likeCounts": --info.likeCounts
          })
        })
    } else {
      ProductApi.doPointPraise(this.data.info.id)
        .then(() => {
          this.setData({
            isLike: !isLike,
            "info.likeCounts": ++info.likeCounts
          })
        })
    }
  },
  // 收藏或取消收藏作品
  doColl() {
    if (app.checkLogin()) {
      return
    }
    let {
      isColl,
      info
    } = this.data
    if (isColl) {
      ProductApi.cancelColl(this.data.info.id)
        .then(() => {
          this.setData({
            isColl: !isColl,
            "info.collectionTimes": --info.collectionTimes
          })
        })
    } else {
      ProductApi.doColl(this.data.info.id)
        .then(() => {
          this.setData({
            isColl: !isColl,
            "info.collectionTimes": ++info.collectionTimes
          })
        })
    }
  },
  // 进行关注 
  doFans() {
    if (app.checkLogin()) {
      return
    }
    ProductApi.doFans(this.data.info.csUser.id)
      .then(res => {
        if (res.state === 200) {
          wx.showToast({
            title: '关注成功',
            icon: 'none'
          })
          app.getServerUserInfo()
          this.setData({
            isFans: true
          })
        }
      })

  },
  // 取消关注 
  doFansCancel() {
    if (app.checkLogin()) {
      return
    }
    ProductApi.doFansCancel(this.data.info.csUser.id)
      .then(res => {
        if (res.state === 200) {
          wx.showToast({
            title: '取消关注',
            icon: 'none'
          })
          app.getServerUserInfo()
          this.setData({
            isFans: false
          })
        }
      })
  },
  // 查看是否已关注 
  doFansCheck(fId) {
    if (app.checkLogin(1)) {
      return
    }
    ProductApi.doFansCheck(fId)
      .then(res => {
        this.setData({
          isFans: res.data
        })
      })
  },
  // 详情页分享 
  onShareAppMessage(e) {
    let {
      name,
      thumbnail: cover
    } = this.data.info
    let info = {
      name,
      cover
    }
    return app.utils.doShare(e, info, app)
  },
  goPath(e) {
    const {
      path
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: path
    })
  },
  doChat() {
    if (app.checkLogin()) {
      return
    }
    this.setData({
      isFocus: true
    })
  },
  // 评论
  focus(e) {
    console.log(e)
    this.setData({
      keyHeight: -10,
      isFocus: true
    })
  },
  blur() {
    this.setData({
      keyHeight: -20,
      isFocus: false
    })
  },
  input(e) {
    this.setData({
      text: e.detail.value
    })
  },
  sendMsg() {
    console.log(this.data.text)
    let {
      text,
      info
    } = this.data
    if (!text.trim()) {
      return
    }
    ProductApi.doComment({
        evaluate: text,
        forumId: info.id
      })
      .then(res => {
        this.setData({
          "commentRules.page": 1,
          "commentRules.rows": 10,
          text: '',
          commentList: []
        }, () => {
          this.getCommentList()
        })
      })
  },
  notDo(e) {
    console.log(e)
  },
  doBuy() {
    this.setData({
      buyShow: true
    })
  },

  confirm(e) {
    if (app.checkLogin()) {
      return
    }

    let {
      types,
      years
    } = e.detail
    let {
      info
    } = this.data
    this.setData({
      buyShow: false
    })
    let type = 5 // 默认买断
    if (info.typesWorks == 3 && types == 2) {
      // 原创商业企业授权
      type = 3
    } else if (info.typesWorks == 3 && types == 1) {
      // 原创商业个人授权
      type = 2
    } else if (info.typesWorks == 1 || info.typesWorks == 2) {
      type = 4
      // 去生成共享分订单
      return this.createSharePointOrder({
        detailedWorksId: info.id,
        years: years
      })
    } else if (info.typesWorks == 4) {
      // 原创非商业
      type = 1
    }
    let designId = this.data.info.id

    let detailedWorks = `${designId}|${type}|${years}`
    let data = {
      detailedWorks
    }
    /**
     * 1,2 = 4 共享分
     * 2 = 个人
     * 3 = 企业
     * 1 = 原来非商业
     * 5 = 永久
     */

    OrderApi.createOrder(data)
      .then(res => {
        console.log(res)
        if (res.state == 200) {
          wx.navigateTo({
            url: './payment/payment?orderId=' + res.data.orderId,
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '该作品已购买，无需重复购买'
          })
        }
      })
  },
  // 生成共享分订单
  createSharePointOrder(data) {
    let {
      info
    } = this.data
    let integral = this.data.userInfo.integral // 用户所持共享分
    let totalPoint = info.sharingPointsPrice * data.years
    if (totalPoint > integral) {
      return wx.showModal({
        title: '共享分不足',
        content: `当前共享分为：${integral}`,
        showCancel: false,
        success: () => {
          // wx.navigateBack()
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: `使用${totalPoint}共享分购买该作品？`,
        showCancel: true,
        success: res => {
          if (res.confirm) {
            OrderApi.createSharePointOrder({
                detailedWorksId: info.id,
                years: data.years
              })
              .then(result => {
                console.log(result)
                if (result.state == 200) {
                  wx.redirectTo({
                    url: `./status/status?point=${totalPoint}&payType=3`,
                  })
                } else {
                  wx.showToast({
                    title: result.message || '购买失败',
                    icon: 'none'
                  })
                }
              })
          }
        }
      })
    }

  }
})