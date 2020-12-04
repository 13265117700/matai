Page({
    data: {
      current: 0,
      navBarHeight: 0
    },

    navBarLoad: function(e) {
      console.log(e)
      this.setData({
        navBarHeight: e.detail.navBarHeight
      })
    },
  
    change: function(e) {
      console.log(e,123123)
      this.setData({
        current: e.detail.current
      })
    },
  });