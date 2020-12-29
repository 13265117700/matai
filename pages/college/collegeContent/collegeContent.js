// pages/college/collegeContent/collegeContent.js

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
    collegeViewIdData: [],
    collegeEvaluationDataTotal: 0,
    userCollegeAreYouConcerned: false,
    coursePrice: "",
    introductionVideo: "1",
    createCollegeOrder:  false,
    purchaseDisplayView : "",
    spbpf: 2,
    options: {},
    message: "",
    collegeEvaluationData: [],
    rules: {
      page: 1,
      rows: 10,
      collegeEvaluationId : "",
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.sssssssss()
    let viewId = options.viewId;
    let videosp = 1;

    //查询是否已购买课程
    coll.getCreateCollegeOrderFindAll({collegeId: viewId}).then(res => {
    
      if(res.state == 200){
        this.setData({
          //获取课程视频解析数据
          createCollegeOrder: res.data,
  
        })
      }
      

      
    })

    //购买课程后的内容
    coll.getPurchaseDisplayView({id: viewId}).then(res => {
    
      if(res.state == 200){
        this.setData({
          //获取购买课程后的内容
          purchaseDisplayView: res.data,
  
        })
      }
    

      
    })


//课程是否已收藏
coll.getUserCollegeAreYouConcerned({collegeId: viewId}).then(res => {
    
  if(res.state == 200){
    this.setData({
      //课程是否已收藏
      userCollegeAreYouConcerned: res.data,

    })
  }


  
})



    this.setData({
      u: app.g.userInfo
    })

    //获取文章数据
    coll.getCollegeViewId({
        id: viewId
      })
      .then(res => {

        if (res.data.introductionVideo === "") {
          this.setData({
            //获取课程视频解析数据
            introductionVideo: "",

          })
        }
        let data = res.data
        data.courseIntroduction = data.courseIntroduction.replace(/\<img src=/g, '<img style="width:100%;height:auto;display:block" src=');
        data.courseIntroduction = data.courseIntroduction.replace(/\<img style=".*?"/g, '<img style="width:100%;height:auto;display:block"');

        this.setData({
          collegeViewIdData: data,
          //   currentTab : data.rows[0].name,
          coursePrice: data.coursePrice.toFixed(2),

        })
      })
    //设定tab默认值
    var that = this;
    if (this.data.currentTab === 0) {

      return false;

    } else {

      that.setData({
        currentTab: 0,
      })
    }


    //获取文章评价
    this.setData({
      "rules.collegeEvaluationId": viewId
      }, () => {
      this.getList()
    })
    




  },
  onShow() {
    let Shinjitunopage = Boolean(wx.getStorageSync('app'))
    if (!Shinjitunopage) {
      wx.switchTab({
        url: '/pages/index/index',
      })
    } else {
      this.checkCart()
    }
  },

  // 分享
  onShareAppMessage() {

      let title = '我给你分享了一个页面，图可图' // 默认值 可根据情况动态设置
      let path = ''// 默认值 当前页面 path ，必须是以 / 开头的完整路径
      let imageUrl = '' // 图片
  
      let pages = getCurrentPages()    //获取加载的页面
      let currentPage = '/' + pages[pages.length-1].route    //获取当前页面的对象
      let options = pages[pages.length-1].options    //获取当前页面的对象
      let ary = []
      let str
      //对象的遍历操作
      for (let i in options) {
          //将对象名push到数组里
          ary.push(i)
          //对象的值
          ary.push(`=${options[i]}&`)
      }
      //将数组转变成字符串
      str = ary.join('')
      //将字符串最后一个&符剪切走  
      str = str.slice (0,str.length-1)
      if (str) {
         currentPage =  currentPage + '?' + str
      }

      // 有查询参数 并且已登录
      if (app) {
        if (currentPage.indexOf('?') > -1 && app.g.userInfo) {
          path = currentPage + '&share=' + app.g.userInfo.popularizeId
        } else if (app.g.userInfo) {
        // 已登录
          path = currentPage + '?share=' + app.g.userInfo.popularizeId
        } else {
          path = currentPage
        }
      } else {
        path = currentPage
      }

    console.log(path)
  
      return {
        title,
        path,
        imageUrl
      }
    },

  
  getVideo(e) {
    var spbpf = e.currentTarget.dataset.id;
    this.setData({
      spbpf: spbpf,
      introductionVideo: 1,
      kebf: e.currentTarget.dataset.kebf,
      options: {
        title: e.currentTarget.dataset.title, // 视频标题
        currentPoster: e.currentTarget.dataset.currentPoster, // 封面图
        state: e.currentTarget.dataset.state, // 1收费  2免费
        videoId: e.currentTarget.dataset.videoId // 视频id
      }
    })
  },



  // 点击cover播放，其它视频结束
  videoPlay: function (e) {
    var _index = e.currentTarget.id
    this.setData({
      _index: _index
    })
    //停止正在播放的视频
    var videoContextPrev = wx.createVideoContext(this.data._index)
    videoContextPrev.stop();
    setTimeout(function () {
      //将点击视频进行播放
      var videoContext = wx.createVideoContext(_index)
      videoContext.play();
    }, 500)
  },



  // tab切换效果
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },



  // 加入购物车
  selectPicker: function (e) {
    if (app.checkLogin()) {
      return
    }

    let id = e.target.dataset.id;
    let state = 200;
    console.log(id)
    coll.postCreateCollegeShoppingCart({
        designWorksId: id
      })

      .then(res => {

        var state1 = res.state;

        if (state1 === state) {




          wx.showToast({
            title: '添加购物车成功',
            icon: 'success',
            duration: 2000
          })


        } else {

          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 2000
          })



        }

      })





  },





  //立即购买
  buy_now: function (e) {

    if (app.checkLogin()) {
      return
    }

    let id = e.target.dataset.id;

    console.log(id)

    coll.postCreateCollegeOrder({collegeId: id }).then(res => {
    
      var state1 =  res.state;
  
      if(state1 === 200){
  
       let orderId =  res.data.orderId

      //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
       wx.navigateTo({    

        url:"../collegeOrder/collegeOrder?vieworderid="+orderId

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


  gwc_tz(){
    //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
    wx.navigateTo({    

      url:"../collegeShoppingCart/collegeShoppingCart"

      })
  },

   //课程收藏
  zuop_shouc(e){

      let id = e.target.dataset.id || e.currentTarget.dataset.id

      console.log("收藏id"+id)

      coll.postUserCollege({collegeId: id}).then(res => {
    
      
        if(res.state === 200){
          wx.showToast({
            title: "收藏成功",
            icon: 'none',
            duration: 2000
          })

          this.setData({
            //课程是否已收藏
            userCollegeAreYouConcerned: true ,
      
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

 //取消课程收藏
 zuop_shouc_y(e){

  let id = e.target.dataset.id || e.currentTarget.dataset.id

  console.log("收藏id"+id)

  coll.postUserCollegeDelete({id: id}).then(res => {

  
    if(res.state === 200){
      wx.showToast({
        title: "取消收藏成功",
        icon: 'none',
        duration: 2000
      })

      this.setData({
        //课程是否已收藏
        userCollegeAreYouConcerned: false ,
  
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



  getList(e) { 


    coll.getCollegeEvaluation(this.data.rules)
      .then(res => {
        this.setData({
          collegeEvaluationData: res.data.rows,
          collegeEvaluationDataTotal: res.data.total,
        })
      })
  
  },


  //取消点赞
  cancellikes(e){

    let list = this.data.collegeEvaluationData
    let id = e.target.dataset.id
    
    let n = e.target.dataset.index  //点击那条数据的下标

    coll.postDeletePointPraise({collegeEvaluationId: id }).then(res => {
    
      var state1 =  res.state;
      
      let str = `collegeEvaluationData[${n}].numberLikes`
      let str2 = `collegeEvaluationData[${n}].likeStatus`
      if(state1 === 200){
        console.log(list)
        this.setData({
          [str]: --list[n].numberLikes,
          [str2]: !list[n].likeStatus,
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

  //点赞
  pointpraise(e){
    let list = this.data.collegeEvaluationData
    let id = e.target.dataset.id
    
    let n = e.target.dataset.index  //点击那条数据的下标

    coll.postCollegeEvaluationPoint({collegeEvaluationId: id }).then(res => {
    
      var state1 =  res.state;
      
      let str = `collegeEvaluationData[${n}].numberLikes`
      let str2 = `collegeEvaluationData[${n}].likeStatus`
      if(state1 === 200){
        console.log(list)
        this.setData({
          [str]: ++list[n].numberLikes,
          [str2]: !list[n].likeStatus,
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