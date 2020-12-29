Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isNavigator: {//接收父组件传来的值
      type: Boolean,
      value: false
    }

  },
  data: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    

    formSubmit: function (e) {
      //搜索
      let ss = e.detail.value.sss
  
      let options = {};
      let detail = { "value": ss}
      this.triggerEvent('searchInput', detail, options )//注册触发事件在父组件使用,把在父组件需要用的值传过去
  
    }


  },



  


})