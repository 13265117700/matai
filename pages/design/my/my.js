var desigField = require('../../../data/desigfield.js')

const app = getApp()
Page({
  data: {
    userInfo: {
      faceImage: '/images/icon/my/scs1212.jpg'
    },
    address: '', // 地址
    occupation: 1, // 职业
    toolsList: [{
        id: 1,
        path: '',
        icon: '/images/icon/my/chuanzuo@2x.png',
        name: '我的空间'
      }, // 这个在onshow的时候设置了
      {
        id: 2,
        path: '/pages/design/my/coll/myColl',
        icon: '/images/icon/my/shouc@2x.png',
        name: '我的收藏'
      },
      {
        id: 3,
        path: '/pages/design/my/designOrder/designOrder',
        icon: '/images/icon/my/wodd@2x.png',
        sp: true,
        name: '我的订单'
      },
      {
        id: 4,
        path: '/pages/design/my/event/myEvent',
        icon: '/images/icon/my/hd@2x.png',
        name: '我的活动'
      },
      {
        id: 5,
        path: '/pages/design/my/wallet/wallet',
        icon: '/images/icon/my/qb@2x.png',
        sp: true,
        name: '我的钱包'
      },
      {
        id: 6,
        path: '/pages/design/my/group/group',
        icon: '/images/icon/my/faz@2x.png',
        sp: true,
        name: '发展团队'
      },
      {
        id: 7,
        path: '/pages/design/my/auth/auth',
        icon: '/images/icon/my/renz@2x.png',
        name: '身份认证'
      },
      {
        id: 8,
        path: '/pages/design/my/vip/vip',
        sp: true,
        icon: '/images/icon/my/kthy@2x.png',
        name: 'VIP开通'
      }
    ],
    // isTabBar 是否使用tabbar的跳转方式 isReplace是否使用replace跳转
    linkList: [{
        id: 1,
        path: '/pages/college/user/user',
        icon: '/images/icon/my/zs@2x.png',
        name: '我的课程',
        isPay: true,
        login: true
      },
      {
        id: 2,
        path: '/pages/design/my/mall/mall',
        icon: '/images/icon/my/sc@2x.png',
        name: '我的商城',
        isPay: true,
        login: true
      },
      {
        id: 3,
        path: '/pages/design/find/find',
        icon: '/images/icon/my/tk@2x.png',
        name: '灵感图库',
        isTabBar: true,
        login: false
      },
      {
        id: 4,
        path: '/pages/design/font/font',
        icon: '/images/icon/my/ziti@2x.png',
        name: '字体字库',
        login: false
      },
      // { id: 5, path: '/pages/design/event/event', icon: '/images/icon/my/hd@2x(1).png', name: '活动' },
    ],
    otherList: [{
        id: 1,
        path: '/pages/design/my/setting/setting',
        icon: '/images/icon/my/sz@2x.png',
        name: '设置中心'
      },
      // {
      //   id: 2,
      //   path: '',
      //   icon: '/images/icon/my/bz@2x.png',
      //   name: '帮助反馈'
      // },
    ],
    isPay: false, // 开启支付, 如果为true的时候, 表示所有isPay为true的字段都不显示
    Shinjitunopage: false,
    showCover: false, // 显示客服遮罩层
    showGray: false, // 显示客服帮助modal
  },

  onShow() {
    let userInfo = app.g.userInfo
    if (!userInfo) {
      app.asyncUserInfo = res => {
        if (res) {
          let userInfo = res
          let address = userInfo.city ? userInfo.city.split('-')[1] : '未填写'
          let occupation = userInfo.occupation ? desigField.desigFieldList[userInfo.occupation].name : '未认证'
          this.setData({
            "toolsList[0].path": '/pages/design/people/people?id=' + userInfo.id,
            userInfo,
            address,
            occupation
          })
        }
      }
    } else {
      let address = userInfo.city ? userInfo.city.split('-')[1] : '未填写'
      let occupation = userInfo.occupation ? desigField.desigFieldList[userInfo.occupation].name : '未认证'
      this.setData({
        userInfo,
        "toolsList[0].path": '/pages/design/people/people?id=' + userInfo.id,
        address,
        occupation
      })
    }
    let Shinjitunopage = Boolean(wx.getStorageSync('app'))
    this.setData({
      isPay: !Shinjitunopage,
      Shinjitunopage
    })

  },

  onShareAppMessage: function (e) {
    return app.utils.doShare(e, null, app)
  },
  onPullDownRefresh() {
    if (!this.data.userInfo.id) {
      wx.stopPullDownRefresh()
      return
    }
    app.getServerUserInfo(userInfo => {
      wx.stopPullDownRefresh()
      this.setData({
        userInfo
      })
    })
  },

  goPath(e) {
    const {
      path,
      replace,
      tabbar,
      login
    } = e.currentTarget.dataset
    if (!path) {
      return wx.showToast({
        title: '功能正在加急开发中',
        icon: 'none'
      })
    }
    if (login) {
      if (app.checkLogin()) {
        return
      }
    }
    if (tabbar) {
      wx.switchTab({
        url: path
      })
    } else if (replace) {
      wx.redirectTo({
        url: path
      })
    } else {
      wx.navigateTo({
        url: path
      })
    }
  },
  goAuthPath(e) {
    if (app.checkLogin()) {
      return
    }
    const {
      path
    } = e.currentTarget.dataset
    if (!path) {
      return wx.showToast({
        title: '功能正在加急开发中',
        icon: 'none'
      })
    }

    wx.navigateTo({
      url: path
    })
  },
  goAuthPath2(e) {
    let Shinjitunopage = Boolean(wx.getStorageSync('app'))
    if (Shinjitunopage) {
      if (app.checkLogin()) {
        return
      }
      const {
        path
      } = e.currentTarget.dataset
      wx.navigateTo({
        url: path
      })
    } else {
      return
    }
  },
  doCall() {
    wx.makePhoneCall({
      phoneNumber: '4006884898',
    })
  },
  touchmove() {
    return false
  },
  showGray() {
    this.setData({
      showGray: true,
    }, () => {
      setTimeout(() => {
        this.setData({
          showCover: true
        })
      }, 200);
    })
  },
  cancelBtn() {
    this.setData({
      showCover: false,
    }, () => {
      setTimeout(() => {
        this.setData({
          showGray: false
        })
      }, 300);
    })
  },
  onHide() {
    this.setData({
      showGray: false,
      showCover: false
    })
  }
})