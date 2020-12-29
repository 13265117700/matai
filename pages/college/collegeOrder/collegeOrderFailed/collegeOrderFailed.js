import { Product } from '../../../../api/product.js'
const coll = new Product()
const app = getApp()

Page({


   /**
   * 页面的初始数据
   */
  data: {
    viewOrderData: [],
    message : "",
    zffs : "",
  },

 

  onLoad: function (options) {

    app.sssssssss()
    let message = options.message;

    if(message == "null"){
      message = "支付失败，请重新支付"
    }



    let zffs = options.zffs;
    
    this.setData({
      message :message,
      zffs :zffs
    })

    let viewOrderId = options.vieworderid;

    //获取订单数据
    coll.getViewOrderId({id: viewOrderId})
    .then(res => {

      this.setData({
        viewOrderData: res.data,
        
      })
    })



  },

  zfsb_ckdd(){



  },


  zfsb_cxzf(){

    let orderId = this.data.viewOrderData.orderId
 

    wx.redirectTo({
      url:"../collegeOrder?vieworderid="+orderId
    });

    

  }


})