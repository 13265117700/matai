
import { Product } from '../../../api/product.js'
const coll = new Product()
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    rules: {
      page: 1,
      rows: 100,
    },
    //购物车数
    num: 1,
    //所有商品的数
    goodscount: 0,
    is_edit: 0,
    //结算商品数
    settlement_goods: [],
    //是否全选，s是编辑模式
    is_check_all_s: 0,
    is_check_all_d: 0,
    //结算时被选中的件数
    select_scount: 0,
    money: 0,
    num_input: 1
  },

  

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.sssssssss()
    if (app.checkLogin()) {
      return
    }


     this.getList()


     let goods = this.data.goods
     let goodscount = 0
     for (let i = 0; i < goods.length; i++) {
       goodscount += 1
       //添加一个新的属性默认值为0,这个属性用来判断在编辑模式商品是否被选中
       goods[i].dot_s = 0
       //在非编辑模式下商品是否被选中
       goods[i].dot_d = 0
     }
     this.setData({
       goodscount: goodscount,
       goods: goods
     })
 

  },

  goshopping_func() {
    wx.switchTab({
      url: '/pages/college/college',
    })
  },


 //改变购物车模式
 change_edit_func() {
  let is_edit = this.data.is_edit
  let goods = this.data.goods
  let is_check_all_s = this.data.is_check_all_s
  let is_check_all_d = this.data.is_check_all_d
  if (is_edit == 1) {
    for (let i = 0; i < goods.length; i++) {
      //添加一个新的属性默认值为0
      goods[i].dot_s = 0
    }
  } else {
    for (let i = 0; i < goods.length; i++) {
      //添加一个新的属性默认值为0
      goods[i].dot_d = 0
    }
  }
  this.setData({
    is_edit: !is_edit,
    goods: goods,
    is_check_all_s: 0,
    is_check_all_d: 0,
    //改变购物车模式时，所有选中商品数清零
    select_scount: 0,
    money: 0
  })
},
//商品在俩个模式中被选中时的处理
select_goods_func(e) {
  let id = e.currentTarget.dataset.id
  let goods = this.data.goods
  let is_edit = this.data.is_edit
  if (is_edit) {
    for (let i = 0; i < goods.length; i++) {
      if (goods[i].id == id) {
        goods[i].dot_s = !goods[i].dot_s
      }
    }
  } else {
    for (let i = 0; i < goods.length; i++) {
      if (goods[i].id == id) {
        goods[i].dot_d = !goods[i].dot_d
      }
    }
    //非编辑模式下统计选中商品数量和总金额
   
    this.count_money(goods)
    
  }
  this.setData({
    goods: goods,
  })
},
//统计结算金额和结算商品数量
count_money(goods) {


  let select_scount = 0
  let money = 0
  //在非编辑模式下每次选中商品重新统计被选中商品的件数
  for (let i = 0; i < goods.length; i++) {
    if (goods[i].dot_d) {
      select_scount += 1
      money += 1 * goods[i].csCollege.coursePrice
    }
  }
  this.setData({
    select_scount: select_scount,
    money: money,
    settlement_goods : goods,
  })
},
//在不同模式下点击全选
is_check_all_func() {
  let is_edit = this.data.is_edit
  let goods = this.data.goods
  let is_check_all_s = this.data.is_check_all_s
  let is_check_all_d = this.data.is_check_all_d
  if (is_edit) {
    if (is_check_all_s) {
      for (let i = 0; i < goods.length; i++) {
        goods[i].dot_s = 0
      }
    } else {
      for (let i = 0; i < goods.length; i++) {
        goods[i].dot_s = 1
      }
    }
    is_check_all_s = !is_check_all_s
  } else {
    if (is_check_all_d) {
      for (let i = 0; i < goods.length; i++) {
        goods[i].dot_d = 0
      }
    } else {
      for (let i = 0; i < goods.length; i++) {
        goods[i].dot_d = 1
      }
    }
    is_check_all_d = !is_check_all_d
    //在非编辑模式下每次全选商品重新统计被选中商品的件数
    this.count_money(goods)
   
  }
  this.setData({
    goods: goods,
    is_check_all_s: is_check_all_s,
    is_check_all_d: is_check_all_d,
  })
},

//用户点击删除按钮
delete_func() {
  let that = this
  let goods = this.data.goods
  let goods1 = this.data.goods
  let goodscount = 0
  let state =  200;

  wx.showModal({
    title: '提示',
    content: '确认将已选中的删除吗？',
    success: function(res) {

    //获取删除课程id

      goods1 = goods.filter(function(item) {
        return item.dot_s
      });


      let deleteId = '' 
      
      for (let i = 0; i < goods1.length; i++) {

        let i1 = i+1

        if(i1 === goods1.length){
          deleteId = deleteId + goods1[i].id
        }else{
          deleteId = deleteId + goods1[i].id+','
        }
    
      }


      

      if (res.confirm) {
        //数据库删除
        coll.postDeleteCollegeShoppingCartId({id: deleteId}).then(res => {
    
          var state1 =  res.state;
      
          if(state1 === state){
      
            //刷新列表
            goods = goods.filter(function(item) {
              return !item.dot_s
            });
    
            that.setData({
              goods: goods,
            
            })
      
          }else{
      
            wx.showToast({
              title: res.message,
              icon: 'none',
              duration: 2000
            })
          
           
            
          }
          
        })


      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
},




//用户点击结算按钮

settlement_func() {
  let collegeId = '' 

  let shoppingCartSid = '' 

  let settlement_goods = this.data.settlement_goods

  //console.log('获取课程id' + JSON.stringify(settlement_goods))

  for (let i = 0; i < settlement_goods.length; i++) {
    if (settlement_goods[i].dot_d) {

      let i1 = i+1

        if(i1 === settlement_goods.length){
          //课程id
          collegeId = collegeId + settlement_goods[i].csCollege.id,
          //购物车id
          shoppingCartSid = shoppingCartSid + settlement_goods[i].id
        }else{
          //课程id
          collegeId = collegeId + settlement_goods[i].csCollege.id + ',',
          //购物车id
          shoppingCartSid = shoppingCartSid + settlement_goods[i].id + ','
        }

      
    }
  }



  if(collegeId != '' ){

    console.log('获取课程id' + JSON.stringify(collegeId))

    console.log('购物车id' + JSON.stringify(shoppingCartSid))

    //结算课程
    coll.postCreateCollegeOrder({collegeId: collegeId ,shoppingCartSid : shoppingCartSid}).then(res => {
    
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




  }else{
    wx.showToast({
      title: '请选择购买课程',
      icon: 'none',
      duration: 2000
    })
  }

  
  



},







  getList(e) {

      
    coll.getCollegeShoppingCartAll(this.data.rules)
    .then(res => {
      this.setData({
        goods: res.data.rows

      })
    })
       


  },


 

})