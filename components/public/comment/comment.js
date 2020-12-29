const app = getApp()
Component({
  properties: {
    isShow: {
      type: Boolean,
      value: false
    },
    nickName: {
      type: String,
      value: ''
    },
    commentList: {
      type: Array,
      value: []
    },
    numbers: {
      type: Number,
      value: 0
    }
  },

  data: {
    propHeight: 0,
    height: 500,
    swiperHeight: 0,
    text: '',
    keyHeight: -20,
  },
  lifetimes: {
    attached: function () {
      wx.getSystemInfo({
        success: (result) => {
          let { windowHeight } = result
          this.setData({
            height: windowHeight - 100,
            propHeight: windowHeight - 100,
            swiperHeight: windowHeight - 158
          })
        },
      })
    }
  },
  methods: {  
    scrollToTop() {
      this.setAction({
        scrollTop: 0
      })
    },
    focus(e) {
      if (app.checkLogin()) {
        return
      }
      let { height } = this.data
      this.setData({
        keyHeight: -10,
        height: height - e.detail.height
      })
    },
    blur() {
      this.setData({
        keyHeight: -20,
        height: this.data.propHeight
      })
    },
    // 关闭
    close() {
      this.triggerEvent('close', true)
    },
    // 容器下拉到底时触发
    lower() {
      this.triggerEvent('nextPage', true)
    },
    input(e) {
      console.log(e)
      this.setData({
        text: e.detail.value
      })
    },
    send() {
      let {text} = this.data
      if (!text.trim()) {
        return
      }
      this.triggerEvent('send', text)
      this.setData({
        text: ''
      })
    },
    notDo(e) {
      console.log(e)
    }
  }
})
