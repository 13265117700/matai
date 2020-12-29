import { Product} from '../../../../../api/product.js'
const coll = new Product()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo : null,
    collegeEvaluationData :[],
    rules: {
      page: 1,
      rows: 30,
      userId : 0,
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.sssssssss()
   
    let userInfo = app.g.userInfo


    if (!userInfo) {
      app.asyncUserInfo = res => {
        this.setData({
          userInfo: res,
        })

      }
    } else {
    
      this.setData({
        userInfo: app.g.userInfo,
       
      })

    }

    //获取我得评价
    this.setData({
      "rules.userId": 0
      }, () => {
      this.getList()
    })
    

  },


  getList(e) { 


    coll.getCollegeEvaluation(this.data.rules)
      .then(res => {
        this.setData({
          collegeEvaluationData: res.data.rows,
        
        })
      })
  
  },

  

  
})