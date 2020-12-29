// views/OrderDetails/OrderDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //用户内容信息
    informations:[{
      id:0,
      contents:"货主名称：",
      title:"玉米"
    },{
      id:1,
      contents:"货主公司：",
      title:"某某公司名称"
    },{
      id:2,
      contents:"货物分类代码：",
      title:"876446422144"
    },{
      id:3,
      contents:"联系人：",
      title:"何某某"
    },{
      id:4,
      contents:"联系方式：",
      title:"15187687"
    },{
      id:5,
      contents:"跟单人姓名：",
      title:"鹏某某"
    },{
      id:6,
      contents:"跟单人电话：",
      title:"18465485345"
    }],

    //货物信息
    informations_a:[{
      id:0,
      contents:"预计装货吨数:",
      title:"6800吨"
    },{
      id:1,
      contents:"运价（含税）：",
      title:"运费单价 "
    },{
      id:2,
      contents:"其它费用：",
      title:"0元"
    },{
      id:3,
      contents:"滞期约定：",
      title:"装货3天-卸货3天 滞期单价：3000元"
    },{
      id:4,
      contents:"船舶类型：",
      title:"内容内容内容"
    },{
      id:5,
      contents:"货物交接：",
      title:"内容内容"
    },{
      id:6,
      contents:"货损赔偿约定：",
      title:"货损≤ 3%"
    },{
      id:7,
      contents:"船舶大小：",
      title:"内容内容内容"
    },
    {
      id:8,
      contents:"封仓要求：",
      title:"内容内容内容"
    },
    {
      id:9,
      contents:"装货方式：",
      title:"内容内容内容"
    },
    {
      id:10,
      contents:"卸货方式：",
      title:"内容内容内容"
    }],
    value1: 0 ,//流程图
    icon:"",
    show: false,

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