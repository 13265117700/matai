Page({
    data:{
      list:[
          {
            url: '/pages/index/index',
            text: '首页',
            icon: '/images/index/index1-3.png',
            activeIcon: '/images/index/index2-3.png'
          },{
            url: '/pages/myFollow/myFollow',
            text: '我的关注',
            icon: '/images/myFollow/myFollow1-3.png',
            activeIcon: '/images/myFollow/myFollow2-3.png'
          },{
            url: '/pages/deliver/deliver',
            text: '发布',
            icon: '/images/deliver/deliver3.png',
            activeIcon: '/images/deliver/deliver3.png'
          },{
            url: '/pages/order/order',
            text: '订单',
            icon: '/images/order/order1-3.png',
            activeIcon: '/images/order/order2-3.png'
          },{
            url: '/pages/my/my',
            text: '我的',
            icon: '/images/my/my1-3.png',
            activeIcon: '/images/my/my2-3.png'
          }
      ]
    },
    change: function(e) {
        let index = this.data.current
        let list = this.data.list
        let url = list[index].url
        e.currentTarget.dataset.url = url
        wx.switchTab({
            url: url
        })
    }
  })