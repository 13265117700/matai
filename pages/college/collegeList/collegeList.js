// pages/college/collegeList/collegeList.js

import { Product } from '../../../api/product.js'
const coll = new Product()

import { CollegeModel } from '../../../api/college.js'

let collegeModel = new CollegeModel();
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    advertisingRmLbData: [],
    category_parent: [],
    viewPointsMallColumnIdData: [],
    category_parent_selected : 1,
    curNav: 1,
    curIndex: 0,
    xbid : 0,
    rules: {
      page: 1,
      rows: 10,
      sortType : 1,
      collegeColumnId : 1,
      fatherAndSon: "",
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.sssssssss()
    let collegeColumnId = options.collegeColumnId;
    let fatherAndSon = "";
    let topId = "";
    let xbIdL = options.xbid;

    if(options.fatherAndSon == 1){
      fatherAndSon = options.fatherAndSon,
      topId = options.topId;
    }else{
      topId = options.collegeColumnId;
    }

   
    this.setData({
      "rules.collegeColumnId": collegeColumnId,
      "rules.fatherAndSon": fatherAndSon,
      }, () => {
      this.getList()
    })


    //分类栏目列表
    collegeModel.getCollegeColumn((res) => {
      this.setData({
        category_parent: res.data.rows,
      })
    })

    this.setData({
      curNav: options.curNav,
      curIndex: options.curIndex,
      xbid: xbIdL,
    })

  
    

    coll.getViewPointsMallColumnId({id: topId})
    .then(res => {
      this.setData({
        viewPointsMallColumnIdData: res.data,
     //   currentTab : res.data.rows[0].name,
      })
    })

    




  },

showFilter: function() {
    this.setData({
        isFilterShow: !this.data.isFilterShow,
        isScreenFilter: !1,
    });
},


cancelFilter: function() {
  this.setData({
      isFilterShow: !1,
      isScreenFilter: !1,
  });
},



screenFilter: function() {

  this.setData({
      isScreenFilter: !this.data.isScreenFilter,
      isFilterShow: !1,
  });


},




 filterTab: function (e) {
  var data = [true, true, true], index = e.currentTarget.dataset.index;
  data[index] = !this.data.tab[index];
  this.setData({
    tab: data
  })
},


bindSort(e) { 

  this.setData({
    isFilterShow: !1,
    category_parent_selected: e.currentTarget.dataset.order,
    "rules.sortType": e.currentTarget.dataset.sorttype,
    }, () => {
    this.getList()
  })
},



getList(e) { 


  coll.getCollegeFindAll(this.data.rules)
    .then(res => {
      this.setData({
      advertisingRmLbData: res.data.rows,
      })
    })

},



  //事件处理函数  
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
    index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index,
      xbid: "",
      "rules.collegeColumnId": id,
      "rules.fatherAndSon": "",
      
      
    }, () => {
    this.getList()

    coll.getViewPointsMallColumnId({id: id})
    .then(res => {
      this.setData({
        viewPointsMallColumnIdData: res.data,
      })
    })
    }
    
    )
  },

//事件处理函数  
bindCategoryEvents: function (e) {
  // 获取item项的id，和数组的下标值  
  let id = e.target.dataset.id;
  // 把点击到的某一项，设为当前index  
  this.setData({
    isScreenFilter: !1,
    xbid: id,
    "rules.collegeColumnId": id,
    "rules.fatherAndSon": 1,

  }, () => {
    this.getList()
  }
  )
},



onReachBottom: function (e) {

    let rows =  this.data.rules.rows + 10;

    this.setData({
      "rules.rows": rows,
  
    }, () => {

      this.getList()

    }
    )

},



  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function (e) {

    

    
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

 
})