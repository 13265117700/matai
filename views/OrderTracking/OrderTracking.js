// views/OrderTracking/OrderTracking.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    informations:[{
      id:0,
      contents:"订单编号：",
      title:"456454651651651"
    },{
      id:1,
      contents:"承运船名：",
      title:"粤珠海瑞丰65489船"
    },{
      id:2,
      contents:"卸货完成：",
      title:"2020-08-20 18:40"
    }],
    // steps: [
    //   {
    //     text: '卸货完成',
    //     desc: '描述信息',
    //     inactiveIcon: 'location-o',
    //     activeIcon: 'success',
    //   },
    //   {
    //     text: '步骤二',
    //     desc: '描述信息',
    //     inactiveIcon: 'like-o',
    //     activeIcon: 'plus',
    //   },
    //   {
    //     text: '步骤三',
    //     desc: '描述信息',
    //     inactiveIcon: 'star-o',
    //     activeIcon: 'cross',
    //   },
    //   {
    //     text: '步骤四',
    //     desc: '描述信息',
    //     inactiveIcon: 'phone-o',
    //     activeIcon: 'fail',
    //   },
    //   {
    //     text: '步骤四',
    //     desc: '描述信息',
    //     inactiveIcon: 'phone-o',
    //     activeIcon: 'fail',
    //   },
    //   {
    //     text: '步骤四',
    //     desc: '描述信息',
    //     inactiveIcon: 'phone-o',
    //     activeIcon: 'fail',
    //   }
    // ],
     step:[{
          id:'01',
          text:'卸货完成',
          desc:'卸货完成 签收时间:',
          time:'2020-08-20 14:40',
          supplement:'补充内容说明：补充内容说明补充内容说明补充内容说明补充内容说明补充内容说明',    
          url:'/images/order/chuan.png '
     },{
      id:'02',
      text:'到达目的港',
      desc:'到达目的港:',
      time:'2020-08-20 14:40'
    },{
      id:'03',
      text:'装好货',
      desc:'上传装好货时间:',
      time:'2020-08-20 14:40',
      supplement:'补充内容说明：补充内容说明补充内容说明补充内容说明补充内容说明补充内容说明',
      url:'/images/order/chuan.png '
    },{
      id:'04',
      text:'船到装货港',
      desc:'上传空船照片时间:',
      time:'2020-08-20 14:40',
      supplement:'补充内容说明：补充内容说明补充内容说明补充内容说明补充内容说明补充内容说明',
      url:'/images/order/chuan.png '
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})