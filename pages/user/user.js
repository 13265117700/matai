const app = getApp()
var desigField = require('../../data/desigfield.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
   
      userInfo : null
    

  },
  
  pageChange(e) {
    let url = e.target.dataset.path || e.currentTarget.dataset.path
    console.log(url)
    if (url === '/pages/fosterhome/fosterhome') {
      wx.switchTab({
        url: url,
      })
    } else {
      wx.navigateTo({
        url: url,
      })
    }
  },


  eventTap(e) {
    if (!app.g.userInfo) {
      return wx.navigateTo({
        url: '/pages/auth/auth',
      })
    }
   
    let name = e.target.dataset.name || e.currentTarget.dataset.name
    let url = ''

    switch (name) {
      case "zs":
        url = '/pages/sign/sign'
        break
      case "sc":
        url = '/pages/freevisit/freevisit'
        break
      case "tk":
        url = '/pages/auth/auth'
        break
      case "hd":
        url = '/pages/need/need'
        break
      case "sc":
        url = '/pages/shop/shop'
        break
    }

    wx.navigateTo({
      url
    })
  },




  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.sssssssss()
   
    let userInfo = app.g.userInfo
    if (!userInfo) {
      app.asyncUserInfo = res => {
        var city_arr= res.city.split('-');
        
        var desigFieData = desigField.desigFieldList[res.designerCategory];
        

        this.setData({
          userInfo: res,
          city1  :city_arr[1],
          desigFieData: desigFieData
        })

      }
    } else {
      var city_arr= userInfo.city.split('-');
      var desigFieData = desigField.desigFieldList[userInfo.designerCategory];
      this.setData({
        userInfo: app.g.userInfo,
        city1  :city_arr[1],
        desigFieData: desigFieData
      })

    }

    





    



  },


  kaifazhong(){

    wx.showToast({
      title: "开发中",
      icon: 'none',
      duration: 2000
    })
  

  },

  goshopping_func() {
    wx.switchTab({
      url: '/pages/college/college',
    })
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