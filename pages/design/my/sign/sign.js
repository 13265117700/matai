import {
  Sign
} from '../../../../api/design/sign'
const SignApi = new Sign()
const app = getApp()

Page({
  data: {
    userInfo: {},
    current: 7, // 当前连续签到天数
    attendanceRecord: 1, // 是否已签到
    checkList: [{
        id: 0,
        name: '1天',
        icon1: '/images/icon/my/sign/wqd@2x.png',
        icon2: '/images/icon/my/sign/yqd@2x.png',
        icon3: '/images/icon/my/sign/wlqd@2x.png',
        isCurrent: false
      },
      {
        id: 1,
        name: '2天',
        icon1: '/images/icon/my/sign/wqd@2x.png',
        icon2: '/images/icon/my/sign/yqd@2x.png',
        icon3: '/images/icon/my/sign/wlqd@2x.png',
        isCurrent: false
      },
      {
        id: 2,
        name: '3天',
        icon1: '/images/icon/my/sign/wqd@2x.png',
        icon2: '/images/icon/my/sign/yqd@2x.png',
        icon3: '/images/icon/my/sign/wlqd@2x.png',
        isCurrent: false
      },
      {
        id: 3,
        name: '4天',
        icon1: '/images/icon/my/sign/wqd@2x.png',
        icon2: '/images/icon/my/sign/yqd@2x.png',
        icon3: '/images/icon/my/sign/wlqd@2x.png',
        isCurrent: false
      },
      {
        id: 4,
        name: '5天',
        icon1: '/images/icon/my/sign/wqd@2x.png',
        icon2: '/images/icon/my/sign/yqd@2x.png',
        icon3: '/images/icon/my/sign/wlqd@2x.png',
        isCurrent: false
      },
      {
        id: 5,
        name: '6天',
        icon1: '/images/icon/my/sign/wqd@2x.png',
        icon2: '/images/icon/my/sign/yqd@2x.png',
        icon3: '/images/icon/my/sign/wlqd@2x.png',
        isCurrent: false
      },
      {
        id: 6,
        name: '7天',
        icon1: '/images/icon/my/sign/wqd@2x.png',
        icon2: '/images/icon/my/sign/yqd@2x.png',
        icon3: '/images/icon/my/sign/wlqd@2x.png',
        isCurrent: false
      },
    ],
    modalShow: false
  },

  onLoad: function () {
    app.sssssssss()
    this.setInfo(app.g.userInfo)
  },
  setInfo(res, modalShow) {
    let checkDays = res.checkDays
    let attendanceRecord = res.attendanceRecord
    let currDay = `checkList[${checkDays}].name`
    if (checkDays > 0 && attendanceRecord) {
      currDay = `checkList[${checkDays - 1}].name`
      let str = `checkList[${checkDays - 1}].isCurrent`
      this.setData({
        userInfo: res,
        attendanceRecord,
        current: checkDays,
        integral: res.integral,
        [str]: true,
        [currDay]: '今天'
      })
    } else if (checkDays === 0 && attendanceRecord) {
      currDay = `checkList[6].name`
      let str = `checkList[6].isCurrent`      
      this.setData({
        userInfo: res,
        attendanceRecord: res.attendanceRecord,
        current: 7,
        integral: res.integral,
        [currDay]: '今天',
        [str]: true
      })
    } else {
      this.setData({
        userInfo: res,
        attendanceRecord: res.attendanceRecord,
        current: checkDays,
        integral: res.integral,
        [currDay]: '今天'
      })
    }
    if (modalShow) {
      this.setData({
        modalShow: true
      })
    }
  },
  doSign() {
    SignApi.doSign()
      .then(res => {
        app.getServerUserInfo(userInfo => {
          this.setInfo(userInfo, 1)
        })
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
  doCheck(e) {
    let {
      index
    } = e.currentTarget.dataset
    let {
      current,
      attendanceRecord
    } = this.data
    if (attendanceRecord) {
      return
    }
    if (current === 0 && index === 0) {
      this.doSign()
    } else if (current === index) {
      this.doSign()
    }
  },
  close() {
    this.setData({
      modalShow: false
    })
  },
  doModalShow() {
    wx.showModal({
      confirmColor: '#00D1D3',
      confirmText: '我知道了',
      content: '邀请好友注册成功获得88共享分\r\n被推荐人成功注册获得88共享分',
      showCancel: false,
      title: '分享赚共享分',
      success: (result) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  }
})