import {
  Product
} from '../../../api/product.js'
const coll = new Product()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewOrderData: [],
    globalSettings: [],
    xzzffs: 0,

  },



  onLoad: function (options) {
    app.sssssssss()
    let viewOrderId = options.vieworderid;





    //获取订单数据
    coll.getViewOrderId({
        id: viewOrderId
      })
      .then(res => {

        this.setData({
          viewOrderData: res.data,


        })
      })



  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {


    //获取全局设置
    coll.getGlobalSettings()
      .then(res => {

        this.setData({
          globalSettings: res.data,
          xzzffs: res.data.appletPaymentSwitch,

        })
      })


  },







  pay_xcx() {
    let _this = this
    let xzzffs = this.data.xzzffs

    let orderId = _this.data.viewOrderData.orderId

    //余额支付
    if (xzzffs == 0) {

      coll.getCollegeBalancePay({
          id: orderId
        })

        .then(res => {

          var state1 = res.state;



          if (state1 === 200) {


            //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
            wx.navigateTo({

              url: "collegeOrderSucceeded/collegeOrderSucceeded?vieworderid=" + orderId + "&zffs=余额支付"


            })


          } else {

            //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
            wx.navigateTo({

              url: "collegeOrderFailed/collegeOrderFailed?vieworderid=" + orderId + "&message=" + res.message + "&zffs=余额支付"

            })



          }


        })




    }




    //微信支付

    if (xzzffs == 1) {
      wx.login({
        //获取code
        success: function (res) {
          var code = res.code; //返回code
          wx.request({
            url: 'https://api.csooyun.com/wx/chat/GetOpenIdServlet' + '?js_code=' + code,
            method: 'POST',
            header: {
              'content-type': 'json'
            },
            success: (res) => {




              let o = res.data.data

              o = JSON.parse(o)

              console.log('openid为', o.openid);





              let openid = o.openid

              _this.pay_1(orderId, openid)


            }
          })
        }
      })

    }












  },


  pay_xuanz(e) {

    this.setData({
      xzzffs: e.currentTarget.dataset.xzzffs,
    })






  },




  //微信支付
  pay_1(orderId, openid) {




    coll.getPayXcx({
      orderId,
      openid
    }).then(res => {



      wx.requestPayment({
        ...res.data,
        success: res => {

          //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
          wx.navigateTo({
            url: "collegeOrderSucceeded/collegeOrderSucceeded?vieworderid=" + orderId + "&zffs=微信支付"
          })
        },
        fail: function (err) {
          //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
          wx.navigateTo({
            url: "collegeOrderFailed/collegeOrderFailed?vieworderid=" + orderId + "&message=" + res.message + "&zffs=微信支付"
          })
        }
      })
    })
  }
})