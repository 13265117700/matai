Component({
  properties: {
    list: {
      type: Array,
      value: []
    },
    autoplay: {
      type: Boolean,
      value: false
    },
    interval: {
      type: Number, // 自动切换时长
      value: 5000
    },
    duration: {
      type: Number, // 切换动画时长
      value: 300
    },
    circular: {
      type: Boolean, // 是否衔接循环
      value: true
    },
    indicatorDots: {
      type: Boolean, // 是否显示指示点
      value: true
    },
    color: {
      type: String, // 指示点颜色
      value: "#FFFFFF"
    },
    activeColor: {
      type: String,
      value: '#00d1d3' // 当前指示点颜色
    },
    width: {
      type: Number, // 宽度 百分比
      value: 100
    },
    heightScale: {
      type: Number, // 宽度 除以 高度 的比例  
      value: 0.5
    }
  },
  data: {
    swiperWidth: "100%",
    swiperHeight: 0
  },
  attached: function() {
    // 在组件实例进入页面节点树时执行
    wx.getSystemInfo({
      complete: (res) => {
        const { screenWidth } = res
        const { width, heightScale } = this.data
        this.setData({
          "swiperWidth": (screenWidth * width) / 100,
          "swiperHeight": screenWidth * heightScale
        })
      },
    })
  },
  methods: {
    goPath(e) {
      let { path } = e.currentTarget.dataset
      wx.navigateTo({
        url: path,
      })
    }
  }
})
