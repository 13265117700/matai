import { Product } from '../../../../api/product.js'
const coll = new Product()

import {CollegeModel} from '../../../../api/college.js'

let collegeModel = new CollegeModel();

const app = getApp()



Page({

  /**
   * 页面的初始数据
   */
  data: {
    advertisingRmLbData: [],
    category_parent: [],
    currentTab: "全部",
    rules: {
      page: 1,
      rows: 10,
      collegeColumnId : "",
      fatherAndSon: "",
    }
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.sssssssss()
    if (app.checkLogin()) {
      return
    }

    this.setData({
      }, () => {
      this.getList()
    })



    collegeModel.getLatest((res) => {
      this.setData({
        collegeData: res.data.rows,
        //   currentTab : res.data.rows[0].name,
      })
    })


  },




  // 标签切换
  tabChange(e) {

  
  //栏目切换热门
  this.setData({
    "rules.collegeColumnId": e.currentTarget.dataset.id,
    currentTab: e.currentTarget.dataset.name,

  }, () => {

    this.getList(



    )

  })


},



  

  getList(e) { 


    coll.getUserCollegeShouChang(this.data.rules)
      .then(res => {
        this.setData({
        advertisingRmLbData: res.data.rows,
        })
      })
  
  },
 


})