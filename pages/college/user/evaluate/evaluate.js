
import { Product} from '../../../../api/product.js'
const coll = new Product()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    collegeViewIdData: [],
    score:5,
    wenben:"非常好",
    collegeId: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.sssssssss()
    let collegeId = options.collegeId;


    //查询课程
    coll.getCollegeViewId({id: collegeId}).then(res => {
      this.setData({
        //获取购买课程后的内容
        collegeViewIdData: res.data,
        collegeId: collegeId,
      })
      
    })


  },

  pointPraise(e) {

    let score = e.currentTarget.dataset.score;
    let wenben = e.currentTarget.dataset.wenben;

    this.setData({
      score: score,
      wenben: wenben,
    })


  },

   

  formSubmit: function (e) {
    //评论
    let wenbxx = e.detail.value.wenbxx
    //课程id 
    let collegeId = this.data.collegeId
    //评分
    let score = this.data.score

    coll.postCreateCollegeEvaluatio({collegeId: collegeId,evaluationContent: wenbxx,score: score}).then(res => {
      var state1 =  res.state;

      
      if(state1 === 200){

        let id =  res.data.id

      //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
      
       wx.navigateTo({    

        url:"collegeEvaluation/collegeEvaluation?collegeEvaluationId="+id

      })

 

      }else{

        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000
        })
      
      
       
        
      }


      
    })




    
  },
 

 


 
})