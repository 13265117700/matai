import {
  Product
} from '../../../../api/product.js'
const coll = new Product()
const app = getApp()

Page({

  data: {
    viewOrderData: [],
    globalSettings: [],
    status: 1,
  },
  goBack() {
    wx.navigateBack()
  },
  onShow: function () {

    if (app.checkLogin()) {
      return
    }
  },

  onLoad: function (options) {
    let viewOrderId = options.vieworderid;
    app.sssssssss()
    //获取订单数据
    coll.getViewOrderId({
        id: viewOrderId
      })
      .then(res => {
        this.setData({
          viewOrderData: res.data,
          status: res.data.status,
        })
      })
  },
})