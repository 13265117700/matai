//index.js
//获取应用实例
const app = getApp()

Page({
  data:{
    current: 1,
    imageList: [{
      url: 'https://activity.vtuzx.com/doc/vtuUI/weapp/swiper/1.png',
      mode: "widthFix"
    },{
      url: 'https://activity.vtuzx.com/doc/vtuUI/weapp/swiper/2.png',
      mode: "widthFix"
    },{
      url: 'https://activity.vtuzx.com/doc/vtuUI/weapp/swiper/3.png',
      mode: "widthFix"
    },{
      url: 'https://activity.vtuzx.com/doc/vtuUI/weapp/swiper/4.png',
      mode: "widthFix"
    },{
      url: 'https://activity.vtuzx.com/doc/vtuUI/weapp/swiper/5.png',
      mode: "widthFix"
    }],
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
    }],
    orderList:[{
      image: '/images/index/order_img3.png',
      name: '粤清远货3888',
      amount: '煤炭  2000吨',
      begin: '广州黄埔装货港',
      end: '珠海大湾区目的港',
      time: '2020-03-26',
      lowerImages: '/images/index/order-lower_info3.png',
      lowerInfo: '船已到装货港',
      lowerSeat: '/images/index/order-lower_seat3.png'
    },{
      image: '/images/index/ly@3x.png',
      name: '粤B.88888',
      amount: '煤炭  2000吨',
      begin: '成都武侯区',
      end: '德阳中江县',
      time: '2020-08-11',
      lowerImages: '/images/index/lowerImages.png',
      lowerInfo: '车已到装货站点',
      lowerSeat: '/images/index/order-lower_seat3.png'
    },{
      image: '/images/index/order_img3.png',
      name: '粤清远货3888',
      amount: '煤炭  2000吨',
      begin: '广州黄埔装货港',
      end: '珠海大湾区目的港',
      time: '2020-03-26',
      lowerImages: '/images/index/order-lower_info3.png',
      lowerInfo: '船已到装货港',
      lowerSeat: '/images/index/order-lower_seat3.png'
    },{
      image: '/images/index/ly@3x.png',
      name: '粤B.88888',
      amount: '煤炭  2000吨',
      begin: '成都武侯区',
      end: '德阳中江县',
      time: '2020-08-11',
      lowerImages: '/images/index/lowerImages.png',
      lowerInfo: '车已到装货站点',
      lowerSeat: '/images/index/order-lower_seat3.png'
    }],
    serviceList:[{
      title:'马太保险',
      image:'/images/index/bx@3x.png'
    },{
      title:'港口码头',
      image:'/images/index/gk@3x.png'
    },{
      title:'港口里程',
      image:'/images/index/mt@3x.png'
    },{
      title:'法律咨询',
      image:'/images/index/ls@3x.png'
    },{
      title:'企业查询',
      image:'/images/index/cx@3x.png'
    },{
      title:'台风路径',
      image:'/images/index/tflj.png'
    },{
      title:'台风路径',
      image:'/images/index/tq@3x.png'
    },{
      title:'更多',
      image:'/images/index/gd@3x.png'
    }],
    loading: false
  },
  onShow(){
    if(typeof this.getTabBar === "function" && this.getTabBar()){
      this.getTabBar().setData({
        activeIndex:0
      })
    }
  },
  bindChange: function(e) {
    this.setData({
      current: e.detail.current
    })
  },
  bindLoad: function() {
    this.loading = true
  }
})
