import { Product} from '../../../../../api/product.js'
const coll = new Product()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    collegeEvaluationIdData: [],
    advertisingRmLbData: [],
    rules: {
      page: 1,
      rows: 10,
      sortType : 1,
      userId : 0,
      collegeColumnId : "",
      fatherAndSon: "",
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.sssssssss()
    let collegeEvaluationId = options.collegeEvaluationId;


    //查询评价信息
    coll.getCollegeEvaluationId({id: collegeEvaluationId}).then(res => {
      this.setData({
        //查询评价信息
        collegeEvaluationIdData: res.data
      })
      
    })

    //我得课程
    this.setData({
    }, () => {
    this.getList()
  })




  },





  getList(e) { 


    coll.getUserCollegeFindAll(this.data.rules)
      .then(res => {
        this.setData({
        advertisingRmLbData: res.data.rows,
        })
      })
  
  },



})