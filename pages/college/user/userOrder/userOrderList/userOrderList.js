import {
  Product
} from '../../../../../api/product.js'
const coll = new Product()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderFindAll: [],
    rules: {
      page: 1,
      rows: 10,
      status: 3,
    }
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.checkLogin()) {
      return
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.sssssssss()
    coll.getOrderFindAll(this.data.rules)
      .then(res => {
        this.setData({
          orderFindAll: res.data.rows,
        })
      })
  },


  getList(e) {

    coll.getOrderFindAll(this.data.rules)
      .then(res => {
        this.setData({
          orderFindAll: res.data.rows,
        })
      })

  },


  showFilter(e) {

    let status = e.currentTarget.dataset.id

    this.setData({
      "rules.status": status,

    }, () => {

      this.getList()

    })

  },




  /*
        
    * 页面相关事件处理函数--监听用户下拉动作
    */

  onReachBottom: function (e) {

    let rows = this.data.rules.rows + 10;

    this.setData({
      "rules.rows": rows,

    }, () => {

      this.getList()

    })

  },
  goPath(e) {
    const {
      path
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: path
    })
  },

})