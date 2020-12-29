const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo : null,
    mphone : ""
  },

  

 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
    app.sssssssss()
    let userInfo = app.g.userInfo

   

    if (!userInfo) {
      app.asyncUserInfo = res => {


        let number = res.phone;//获取到手机号码字段
   
        let mphone = number.substring(0, 3) + '****' + number.substring(7);


        this.setData({
          userInfo: res,

          mphone: mphone,

         
        })

      }
    } else {
    
      this.setData({
        userInfo: app.g.userInfo,
       
      })

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
})