import {
  Mall
} from '../../../../api/design/mall'
const MallApi = new Mall()
const app = getApp()

Page({

  data: {
    cart: [],
    total: 0,
    list: [], // 用来循环的列表
    totalPrice: 0, // 总价
    totalSharePoints: 0, // 总共享分
    isCheckAll: true, // 是否为全选
    isEdit: false ,// 是不为购物车编辑模式
  },

  onShow() {
    this.checkCart()
  },
  // 查询购物车
  checkCart() {
    if (app.checkLogin(1)) {
      return
    }
    MallApi.fetchCart({page: 1, rows: 1000})
      .then(res=> {
        this.setData({
          cart: res.data.rows,
          total: res.data.total
        })
        this.setList(res.data.rows)
      })
  },
  setList(list) {
    // 注意判断 是否为促销时间
    let arr = []
    for(let i = 0 ; i < list.length; i++) {
      let goods = list[i].csPointsMall
      let o = {
        id: list[i].id,
        goodsId: goods.id,
        name: goods.name,
        price: this.checkCuxiao(goods.promotionStartTime, goods.promotionEndTime) ? goods.salePrice : goods.commodityPrice,
        sharePoint: this.checkCuxiao(goods.promotionStartTime, goods.promotionEndTime) ? goods.saleSharePrice : goods.sharePrice,
        num: 1, // 购买数量, 默认为1
        checked: true, // 是否选中
        cover: goods.productThumbnail, // 封面图
      }

      arr.push(o)
    }
    this.setData({
      list: arr
    }, () => {
      this.setPrice()
    })
  },
  // 查看是否为促销商品
  checkCuxiao(startTime, endTime) {
    let t1 = app.utils.GetRTime(startTime)
    let t2 = app.utils.GetRTime(endTime)
    if (!t1 && t2) {
      return true
    }
  },
  manasu(e) {
    const { index } = e.currentTarget.dataset
    const { list } = this.data

    if (list[index].num == 1) {
      return
    }
    let str = `list[${index}].num`
    this.setData({
      [str]: --list[index].num
    }, () => {
      this.setPrice()
    })
  },
  plus(e) {
    const { index } = e.currentTarget.dataset
    const { list } = this.data

    if (list[index].num == 99) {
      return
    }
    let str = `list[${index}].num`
    this.setData({
      [str]: ++list[index].num
    }, () => {
      this.setPrice()
    })
  },
  setChecked(e) {
    const { index } = e.currentTarget.dataset
    const { list } = this.data
    let str = `list[${index}].checked`
    this.setData({
      [str]: !list[index].checked
    }, () => {
      this.setPrice()
    })
  },
  // 设置显示价格
  setPrice() {
    let { list, isCheckAll } = this.data
    let totalPrice = 0
    let totalSharePoints = 0
    let count = 0
    for (let i = 0; i < list.length; i++) {
      if (list[i].checked) {
        totalPrice += list[i].price * list[i].num
        totalSharePoints += list[i].sharePoint * list[i].num
        count++
      }
    }

    isCheckAll = count === list.length ? true : false

    this.setData({
      totalPrice,
      totalSharePoints,
      isCheckAll
    })
  },
  // 全选与全不选
  checkAll() {
    let { isCheckAll, list } = this.data
    isCheckAll = !isCheckAll
    if (isCheckAll) {
      for (let i = 0; i < list.length; i++) {
        list[i].checked = true
      }
    } else {
      for (let i = 0; i < list.length; i++) {
        list[i].checked = false
      }
    }
    
    this.setData({
      isCheckAll,
      list
    }, () => {
      this.setPrice()
    })
  },
  changeMode() {
    let { isEdit } = this.data

    this.setData({
      isEdit: !isEdit
    })
  },
  // 商品移出购物车
  deleteGoods() {
    const { list } = this.data
    let ids = []
    for (let i = 0; i < list.length; i++) {
      if (list[i].checked) {
        ids.push(list[i].id)
      }
    }
    console.log(ids)

    wx.showModal({
      content: '是否删除已选中商品？',
      success: res => {
        if (res.confirm) {
          // 进行删除操作
          MallApi.deleteCart({designWorksId: ids.toString()})
            .then(res => {
              if (res.state === 200) {
                this.setData({
                  isEdit: false
                })
                this.checkCart()
              }
            })
        }
      }
    })
  },
  // 去结算, (生成购物车订单)
  goPay() {
    const { list } = this.data
    let arr = []
    for (let i = 0; i < list.length; i++) {
      if (list[i].checked) {
        arr.push(list[i])
      }
    }
    wx.setStorageSync('cartList', arr)
    wx.navigateTo({
      url: '../cartOrder/cartOrder',
    })

  },
  onUnload() {
    wx.removeStorageSync('cartList')
  }
})