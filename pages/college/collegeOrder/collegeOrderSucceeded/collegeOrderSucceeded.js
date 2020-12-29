import { Product } from '../../../../api/product.js'
const coll = new Product()
const app = getApp()

Page({


   /**
   * 页面的初始数据
   */
  data: {
    viewOrderData: [],


  },

 

  onLoad: function (options) {
    app.sssssssss()
    let viewOrderId = options.vieworderid;

    //获取订单数据
    coll.getViewOrderId({id: viewOrderId})
    .then(res => {

      this.setData({
        viewOrderData: res.data,
        
      })
    })



  },

  zfcg_order(){

    wx.navigateTo({
      url: '/pages/college/collegeOrder/collegeOrder',
    })

  },


  zfcg_sye(){

    wx.switchTab({
      url: '/pages/college/college',
    
    });

  }


})