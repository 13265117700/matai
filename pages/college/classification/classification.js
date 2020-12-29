
// pages/college/college.js
import { CollegeModel } from '../../../api/college.js'

let collegeModel = new CollegeModel();
const app = getApp()


Page({
  data: {
    collegeColumnData: [],
    curNav: 1,
    curIndex: 0,
    rjleibei: [
      { id: 1, name: 'Photoshop', },
      { id: 2, name: 'After Effects ', },
      { id: 3, name: 'Illustrator', },
      { id: 4, name: 'Lightroom', },
      { id: 5, name: 'Premiere', },
      { id: 6, name: 'Sai', },
      { id: 7, name: 'Sketch', },
    ],
  },


  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.sssssssss()
  
    collegeModel.getCollegeColumn((res) => {
      this.setData({
        collegeColumnData: res.data.rows
    
      })
    })

  



  },

  /**
   * 生命周期函数--监听页面显示
   */

  onShow: function () {
    //读取缓存
    this.setData({
      curNav: wx.getStorageSync('curNav'),
      curIndex: wx.getStorageSync('curIndex')
    })

    let data =  wx.getStorageSync('curNav')

    //删除缓存
    wx.removeStorageSync('curNav');
  
    wx.removeStorageSync('curIndex');

    //缓存数据为空设置默认值
    
    if(data == ''){
      this.setData({
        curNav: 1,
        curIndex: 0
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



  //事件处理函数  
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
    index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
  }


  



})  