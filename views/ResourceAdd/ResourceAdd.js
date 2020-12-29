Page({
  data: {
      id:null,
      navbarTitle:null,
  },
  onLoad: function (options) {
      this.setData({
          id:options.id
      })
  },
  onShow: function () {
      this.tabBarTitle()
    //   this.onMyEvent()
  },

  tabBarTitle(){
      let id = this.data.id;
      switch(id){
          case '115':
              this.setData({
                  navbarTitle:'添加船舶信息'
              })
              break
          case '192':
              this.setData({
                  navbarTitle:'添加车辆'
              })
              break
          case '567':
              this.setData({
                  navbarTitle:'发布船源'
              })
              break
          case '855':
              this.setData({
                  navbarTitle:'发布货源'
              })
              break
          case '609':
              this.setData({
                  navbarTitle:'发布车源'
              })
              break
      }
  },

  onMyEvent:function(e) {
      console.log(e)
      this.setData({
          navbarTitle:e.detail
      })
  }
})