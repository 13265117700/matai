Page({
    data: {
      current: 0,
      navBarHeight: 0
    },
  
    navBarLoad: function(e) {
      this.setData({
        navBarHeight: e.detail.navBarHeight
      })
    },
  
    change: function(e) {
      this.setData({
        current: e.detail.current
      })
    },
  });