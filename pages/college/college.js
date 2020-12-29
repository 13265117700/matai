// pages/college/college.js
import {
  CollegeModel
} from '../../api/college.js'

let collegeModel = new CollegeModel();

import {
  Product
} from '../../api/product.js'

const coll = new Product()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    collegeData: [],
    currentTab: "谈谈",
    advertisingData: [],
    advertisingRmLbData: [],
    rules: {
      page: 1,
      rows: 6,
      pushHome: "",
      sortType: "",
      collegeColumnId: "",
    },
    rulesl: {
      page: 1,
      rows: 10,
      sortType: "",
      collegeColumnId: "",
    },
    tips: '请稍后',
    show: false,
    animated: true,
    Shinjitunopage: false


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    collegeModel.getLatest((res) => {
      this.setData({
        collegeData: res.data.rows,
        //   currentTab : res.data.rows[0].name,
      })
    })
    collegeModel.getAdvertising((res) => {
      this.setData({
        advertisingData: res.data.rows

      })
    })
    this.setData({
      "rules.pushHome": 1,
      "rules.sortType": 4,
    }, () => {
      this.getList()
    })

  },

  //换一批
  changeBatch(e) {

    this.setData({
      "rules.page": this.data.rules.page + 1,
    }, () => {
      this.getList()
    })

    if (this.data.advertisingRmLbData.length != 6) {
      this.setData({
        "rules.page": 1,
      }, () => {
        this.getList()
      })
    }

  },


  getList(e) {
    this.setData({
      show: true
    })
    coll.getCollegeFindAll(this.data.rules)
      .then(res => {
        this.setData({
          advertisingRmLbData: res.data.rows,
          show: false
        })
      })
    coll.getCollegeFindAll(this.data.rulesl)
      .then(res => {
        this.setData({
          advertisingRmLbDatal: res.data.rows,
          show: false
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
      this.getList()
    })

    //栏目切换列表
    this.setData({
      "rulesl.collegeColumnId": e.currentTarget.dataset.id,
    }, () => {
      this.getList()
    })
    const {
      name
    } = e.target.dataset || e.currentTarget.dataset
    this.setData({
      currentTab: name
    })
  },

  onShow() {
    let Shinjitunopage = Boolean(wx.getStorageSync('app'))
    let title = Shinjitunopage ? '图可图知识' : '创秀'
    wx.setNavigationBarTitle({
      title
    })
    if (!Shinjitunopage) {
      wx.showLoading({
        title: '',
      })
      setTimeout(() => {
        wx.hideLoading()
        wx.navigateTo({
          url: './homepage/homepage',
        })
      }, 1000)
    }
    this.setData({
      Shinjitunopage
    })
  },

  /**
   onShow() {
     this.timer = setInterval(() => {
       this.setData({


         show: !this.data.show
       })
     }, 2000)
   },

   onUnload() {
     clearInterval(this.timer)
   },





      
    * 页面相关事件处理函数--监听用户下拉动作
    */


  onReachBottom: function(e) {

    let rows = this.data.rules.rows + 10;

    this.setData({
      "rulesl.rows": rows,

    }, () => {

      this.getList()

    })

  },

  //页面跳转


  onTap: function(event) {



    let curNav = event.currentTarget.dataset.curnav;

    let curIndex = event.currentTarget.dataset.curindex;

    wx.setStorageSync("curNav", curNav);

    wx.setStorageSync("curIndex", curIndex);

    wx.navigateTo({
      url: 'classification/classification',
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

  goshopping_func() {
    wx.switchTab({
      url: '/pages/college/college',
    })
  },


  kaifazhong() {

    wx.showToast({
      title: "开发中",
      icon: 'none',
      duration: 2000
    })


  },


  // 分享
  onShareAppMessage() {

    let title = '我给你分享了一个页面，图可图' // 默认值 可根据情况动态设置
    let path = '' // 默认值 当前页面 path ，必须是以 / 开头的完整路径
    let imageUrl = '' // 图片

    let pages = getCurrentPages() //获取加载的页面
    let currentPage = '/' + pages[pages.length - 1].route //获取当前页面的对象
    let options = pages[pages.length - 1].options //获取当前页面的对象
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
    str = str.slice(0, str.length - 1)
    if (str) {
      currentPage = currentPage + '?' + str
    }

    // 有查询参数 并且已登录
    if (app) {
      if (currentPage.indexOf('?') > -1 && app.g.userInfo) {
        path = currentPage + '&share=' + app.g.userInfo.popularizeId
      } else if (app.g.userInfo) {
        // 已登录
        path = currentPage + '?share=' + app.g.userInfo.popularizeId
      } else {
        path = currentPage
      }
    } else {
      path = currentPage
    }

    console.log(path)

    return {
      title,
      path,
      imageUrl
    }
  },




})