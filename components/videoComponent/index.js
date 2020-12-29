const app = getApp()
Component({
  properties: {
    options: {
      type: Object,
      value: {
        title: '视频标题',
        state: 1, // 1为免费 2为收费
        videoId: '', // 视频id
        currentPoster: '', // 视频封面图 可选
      }
    }
  },
  observers: {
    options(options) {
      if (options.videoId) {
        this.getVideoUrl()
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    rateShow: false,
    currentRate: '1.0',
    videoPlaying: false,
    controlHidden: true,
    currentTime: 0,
    currentResource: '',
    fullScreenData: "",
  },
  lifetimes: {
    attached: function () {
      this.videoContext = wx.createVideoContext('videoPlayer')
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getVideoUrl() {
      const {
        videoId,
        state
      } = this.data.options
      let url = ''
      if (state === 1) { // 免费
        url = `/college/vod/freeAdmission/college/${videoId}`
        // 这里去请求数据然后更新 currentResource
        wx.request({
          url: `https://api.csooyun.com${url}`,
          success: res => {
            this.setData({
              currentResource: res.data.data || ''
            })
          }
        })
      } else {
        url = `/college/vod/getPlayAuth/${videoId}`
        let token = app.g.tokens.access_token
        wx.request({
          url: `https://api.csooyun.com${url}`,
          header: {
            'Authorization': 'bearer ' + token,
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: res => {
            this.setData({
              currentResource: res.data.data || ''
            })
          }
        })
      }



    },
    /** */

    // 视频缓冲触发事件
    videoWaiting() {
      this.setData({
        controlHidden: true
      })
    },

    videoPlayHandle(e) {
      this.data.videoPlaying = true
      this.setData({
        controlHidden: false
      })
      this.videoContext.playbackRate(Number(this.data.currentRate))
    },

    closeControl() {
      this.setData({
        rateShow: false
      })
    },

    tapVideo(e) {
      this.setData({
        rateShow: false,
      })
      if (this.data.videoPlaying && !this.data.fullScreenData) {
        this.setData({
          controlHidden: !this.data.controlHidden
        })
      }
    },

    showSwitchRate(rate) {
      this.setData({
        rateShow: true
      })
    },

    switchRate(e) {
      let dataset = e.currentTarget.dataset
      let {
        rate
      } = dataset
      console.log(this.data.videoplaying)
      if (this.data.videoplaying) {
        this.videoContext.playbackRate(Number(rate))
      }
      this.setData({
        currentRate: rate,
        rateShow: false
      })
    },

    timeUpdate(e) {
      let {
        currentTime
      } = e.detail
      this.data.currentTime = currentTime
      this.data.videoplaying = true
    },

    playPaused() {
      this.data.videoplaying = false
    },

    fullScreen(e) {
      let {
        fullScreen,
        direction
      } = e.detail
      console.log(e)
      let fullScreenData = ""
      if (fullScreen) {
        fullScreenData = " full-screen " + direction
        this.setData({
          controlHidden: false
        })
      }
      console.log({
        fullScreen,
        direction
      })
      this.setData({
        fullScreenData
      })
      console.log(this.data.fullScreenData)
    }
  }
})