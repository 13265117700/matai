Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isNavigator: { //接收父组件传来的值
      type: Boolean,
      value: false
    },
    placeText: {
      type: String,
      value: '请输入作品关键字'
    },
    value: {
      type: String,
      value: ''
    },
  },
  data: {
    text: ''
  },
  /**
   * 组件的方法列表
   */
  methods: {
    formSubmit: function (e) {
      // //搜索
      // let ss = e.detail.value.sss
      // let options = {};
      // let detail = {
      //   "value": ss
      // }
      // this.triggerEvent('searchInput', detail, options) //注册触发事件在父组件使用,把在父组件需要用的值传过去
      //搜索
      let ss = this.data.text
      let options = {};
      let detail = {
        "value": ss
      }
      this.triggerEvent('searchInput', detail, options) //注册触发事件在父组件使用,把在父组件需要用的值传过去
    },
    bindfocus() {
      this.triggerEvent('focus', 1)
    },
    back() {
      wx.navigateBack()
    },
    bindinput(e) {
      this.setData({
        text: e.detail.value
      })
    }
  },
})