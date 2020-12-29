import {
  Mall
} from '../../../../api/design/mall'
const MallApi = new Mall()
const app = getApp()

Page({
  data: {
    id: 0,
    pics: [],
    indicatorDots: false, //小点
    indicatorColor: "white", //指示点颜色
    activeColor: "#67a2ce", //当前选中的指示点颜色
    autoplay: false, //是否自动轮播
    interval: 3000, //间隔时间
    duration: 300, //滑动时间
    swiperHeight: 0,
    info: {},
    form: {
      day: ''
    },
    currentIndex: 1,
    isCx: false, // 是否为促销时间
    cxTime: ['00', '00', '00'], // 促销结束倒计时 时 分 秒
    buyShow: false,
    userInfo: {},
    cart: [],
    total: 0,
    isPlaying: false
  },
  onLoad: function (options) {
    const { id } = options
    wx.getSystemInfo({
      success: (result) => {
        this.fetchInfo(id)
        this.setData({
          swiperHeight: result.screenWidth,
          id
        })
      }
    })
    //  userInfo
    let userInfo = app.g.userInfo
    if (!userInfo) {
      app.asyncUserInfo = res => {
        if (res) {
          let userInfo = res
          this.setData({
            userInfo
          })
        }
      }
    } else {
      this.setData({
        userInfo
      })
    }
  },
  onShow() {
    let Shinjitunopage = Boolean(wx.getStorageSync('app'))
    if (!Shinjitunopage) {
      wx.switchTab({
        url: '/pages/index/index',
      })
    } else {
      this.checkCart()
    }
  },

  fetchInfo(id) {
    MallApi.fetchInfo(id)
      .then(res => {
        console.log(res)
        if (res.state == 200) {
          let data = res.data
          data.details = data.details.replace(/\<img class=".*?"/g, '<img');
          data.details = data.details.replace(/\<img alt=".*?"/g, '<img');
          data.details = data.details.replace(/\<img style=".*?"/g, '<img');
          data.details = data.details.replace(/\<img/g, '<img style="max-width:100%;height:auto;display:block"');
          this.setCuxiao(data.promotionStartTime, data.promotionEndTime)

          // 如果有视频的话, 需要增加一个图切换, 第一个图片放上视频播放标记
          let pics = data.productGroupChart.split(',')
          if (data.productVideo) {
            pics.unshift(data.productThumbnail)
            this.videoContext = wx.createVideoContext('#video')
          }
          this.setData({
            info: data,
            pics
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
  swiperChange(e) {
    let current = e.detail.current
    this.setData({
      currentIndex: current + 1
    })
  },
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
  doBuy() {
    this.setData({
      buyShow: true
    })
  },
  close() {
    this.setData({
      buyShow: false
    })
  },
  confirm(e) {
    if (app.checkLogin()) {
      return
    }
    // 购买数量
    let { years } = e.detail
    console.log('confirm', years)
    let { id } = this.data.info
    wx.navigateTo({
      url: `../createOrder/createOrder?id=${id}&num=${years}`,
    })
  },
  // 查询购物车
  checkCart() {
    if (app.checkLogin(1)) {
      return
    }
    MallApi.fetchCart({page: 1, rows: 1000})
      .then(res=> {
        this.setData({
          cart: res.data.rows,
          total: res.data.total
        })
      })
  },
  // 加入购物车
  addToCart() {
    if (app.checkLogin()) {
      return
    }
    const { info, cart } = this.data

    if (info.activity == 1) {
      return wx.showToast({
        title: '活动类商品\r\n无法加入购物车',
        icon: 'none'
      })
    }

    let o = cart.find(item => item.csPointsMall.id == info.id)
    if (o) {
      return wx.showToast({
        title: '该商品已在购物车内',
        icon: 'none'
      })
    }

    MallApi.createCart({designWorksId: info.id})
      .then(res => {
        console.log(res)
        if (res.state == 200) {
          wx.showToast({
            title: '添加成功',
            icon: 'none'
          })
          this.checkCart()
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none'
          })
        }
      })
  },
  goAuthPath(e) {
    if (app.checkLogin()) {
      return
    }
    const {
      path
    } = e.currentTarget.dataset
    if (path) {
      wx.navigateTo({
        url: path
      })
    }
  },
  preview() {
    const { pics, currentIndex, info } = this.data
    let imgs = [].concat(pics)
    if (info.productVideo && currentIndex == 1) {
      this.setData({
        isPlaying: true
      })
      return
    } else if (info.productVideo) {
      imgs.shift()
      wx.previewImage({
        urls: imgs,
        current: imgs[currentIndex - 2]
      })
    } else {
      wx.previewImage({
        urls: imgs,
        current: imgs[currentIndex - 1]
      })
    }

  },
  playVideo() {
    console.log('playVideo')
    this.setData({
      isPlaying: true
    }, () => {
      this.videoContext.play()
    })
  },
  bindplay() {
    console.log('bindplay')
  },
  bindpause() {
    this.setData({
      isPlaying: false
    }, () => {
      this.videoContext.pause()
    })
  },
  bindended() {
    this.setData({
      isPlaying: false
    })
  },
})