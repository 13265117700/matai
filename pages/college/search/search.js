import { Product } from '../../../api/product.js'
const coll = new Product()
const app = getApp()

Page({

  data: {
    items: [],
    history: [],
    lisss: 1,
    rules: {
      page: 1,
      rows: 10,
      name: "",
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.sssssssss()
    let _this = this;
    wx.getStorage({
      key: 'searched',
      success: function(res) {
        console.log(res)
        let history = res.data;
        _this.setData({
          history,
        })
      },
    })
    
  

  },

  onsearchInput(e) {
    let _this = this;

    let value = e.detail.value;
   let history = _this.data.history;
    _this.setData({//调用搜索接口
      "rules.name": value,
      lisss: 0, 
      }, () => {
      this.getList()//更新data数据
    })

    history.push({
      title: value
    })
    // 对点击后的数据做缓存,之后显示在历史记录上
    wx.setStorage({
      key: 'searched',
      data: history,
      success(res) {
        console.log(`保存成功 `)
      }
    })



  },



  onclear() {
    let _this = this;
    wx.removeStorage({
      key: 'searched',
      success: function(res) {

      },
    });
    _this.setData({
      history:null
    })
  },
  
  huanss(e) {
    var title = e.currentTarget.dataset.title;

    this.setData({//调用搜索接口
      "rules.name": title,
      lisss: 0, 
      }, () => {
      this.getList()//更新data数据
    })

  
  },



  getList(e) { 


    coll.getCollegeFindAll(this.data.rules)
      .then(res => {
        this.setData({
          items: res.data.rows,
        })
      })
  
  },

 


onReachBottom: function (e) {

  let rows = this.data.rules.rows + 10;

  this.setData({
    "rulesl.rows": rows,

  }, () => {

    this.getList()

  })

},


})