// views/OrderAgreement/OrderAgreement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    informations:[{
      id:0,
      contents:"合同编号：",
      title:"3664151531"
    },{
      id:1,
      ecolor:"#0974E7",
      contents:"订单信息：",
      title:"查看订单"
    }],
  
    leftText:[{
      id:0,
      content:" 6.1托运方(甲方)",
      name:"跟单人姓名：",
      phone:"跟单人电话：",
     email:"邮箱:"
    },{
      id:1,
      content:" 6.2承运方(乙方)",
      name:"法定代表人",
      phone:"联系方式",
      email:"邮箱:"
    },{
      id:2,
      content:" 6.3实质运输方(丙方)",
      name:"丙方联系人",
      phone:"联系方式",
      email:"邮箱:"
    }],

    rightText:[{
      id:0,
      content:" 6.1托运方(甲方)",
      name:"跟单人姓名：",
      phone:"跟单人电话：",
     email:"邮箱:"
    },{
      id:1,
      content:" 6.2承运方(乙方)",
      name:"法定代表人",
      phone:"联系方式",
      email:"邮箱:"
    },{
      id:2,
      content:" 6.3实质运输方(丙方)",
      name:"丙方联系人",
      phone:"联系方式",
      email:"邮箱:"
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