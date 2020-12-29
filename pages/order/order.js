// pages/order/order.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        activeIndex:0,

        //货主订单
       Btn:[{
        id:0,
        title:"发起申诉"
    },{
        id:1,
        title:"查看合同"
    },{
        id:2,
        title:"发起聊天"
    },{
        id:0,
        title:"订单轨迹"
    }],

        // 货主订单状态渲染数据 开始
    tabs:[{
         id:1,
         label:'运输中',
         name:'name1'
       
    },{
        id:2,
        label:'确认订单金额',
        name:'name2'
   },{
    id:3,
    label:'打款中',
    name:'name3'
},{
    id:4,
    label:'订单完成',
    name:'name4'
},{
    id:5,
    label:'售后中',
    name:'name5'
},{
    id:6,
    label:'已取消',
    name:'name6'
}],
    value2: 'name1',

    // 货主订单状态渲染数据 结束
     
    },change(e) {
        this.setData({
          value2: e.detail.name
        })
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
        if(typeof this.getTabBar === "function" && this.getTabBar()){
            this.getTabBar().setData({
                activeIndex:3
            })
        }
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