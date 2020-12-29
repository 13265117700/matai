Component({
  properties: {
    isShow: {
      type: Boolean,
      value: false
    },
    info: {
      type: Object,
      value: {}
    },
    isCx: {
      type: Boolean,
      value: false
    }
  },

  data: {
    height: 200,
    swiperHeight: 0,
    years: 1
  },
  lifetimes: {
    attached: function () {
      wx.getSystemInfo({
        success: (result) => {
          let {
            windowHeight
          } = result
          this.setData({
            height: windowHeight - 300,
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
    notDo() {
      return false
    },
    close() {
      this.triggerEvent('close', true)
    },
    confirm() {
      let {
        years
      } = this.data
      let params = {
        years
      }
      this.triggerEvent('confirm', params)
    },


    manasu() {
      let {
        years
      } = this.data
      if (years == 1) {
        return
      }
      this.setData({
        years: --years
      })
    },
    plus() {
      let {
        years
      } = this.data
      if (years == 99) {
        return
      }
      this.setData({
        years: ++years
      })
    },
  }
})