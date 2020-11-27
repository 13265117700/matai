//index.js
//获取应用实例
const app = getApp()

Page({
  data:{
    current: 1,
    imageList: [
        {
          url: 'https://activity.vtuzx.com/doc/vtuUI/weapp/swiper/1.png',
          mode: "widthFix"
        },
        {
          url: 'https://activity.vtuzx.com/doc/vtuUI/weapp/swiper/2.png',
          mode: "widthFix"
        },
        {
          url: 'https://activity.vtuzx.com/doc/vtuUI/weapp/swiper/3.png',
          mode: "widthFix"
        },
        {
          url: 'https://activity.vtuzx.com/doc/vtuUI/weapp/swiper/4.png',
          mode: "widthFix"
        },
        {
          url: 'https://activity.vtuzx.com/doc/vtuUI/weapp/swiper/5.png',
          mode: "widthFix"
        }
    ],
    cardList:[{
        url: '/images/index/chuanyuan@3x.png',
        text: '船源信息'
    },{
        url: '/images/index/huoyuan@3x.png',
        text: '船运货源'
    },{
        url: '/images/index/cy@3x.png',
        text: '车运货源'
    },{
        url: '/images/index/daolu@3x.png',
        text: '车辆信息'
    }]
  },
  bindChange: function(e) {
    this.setData({
      current: e.detail.current
    })
  }
})
