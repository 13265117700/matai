import {
  HTTP
} from '../../request/request'

class Mall extends HTTP {
  // 查商品列表
  fetchList(data) {
    return this.req({
      method: 'GET',
      url: '/reception/pointsMall/answerFindAll',
      data
    })
  }

  fetchInfo(id) {
    return this.req({
      method: 'GET',
      url: '/reception/pointsMall/viewPointsMallId',
      data: {
        id
      }
    })
  }

  // 收货地址列表
  fetchAddressList(data) {
    return this.reqWithToken({
      method: 'GET',
      url: '/user/shippingAddress/shippingAddressFindAll',
      data
    })
  }
  // 收货地址详情
  fetchAddressInfo(data) {
    return this.reqWithToken({
      method: 'GET',
      url: '/user/shippingAddress/viewShippingAddressId',
      data
    })
  }

  // 添加收货地址
  createAddress(data) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/shippingAddress/createShippingAddress',
      data
    })
  }
  // 修改收货地址
  updateAddress(data) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/shippingAddress/updateShippingAddress',
      data
    })
  }
  // 删除收货地址
  deleteAddress(data) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/shippingAddress/delete',
      data
    })
  }

  // 创建订单 
  createOrder(data) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/pointsMallOrder/create',
      data
    })
  }
  // 添加购物车 designWorksId
  createCart(data) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/pointsMallShopping/createShopping',
      data
    })
  }
  // 删除购物车 designWorksId: 1,2,3
  deleteCart(data) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/pointsMallShopping/deleteShoppingId',
      data
    })
  }
  // 查订单列表
  fetchOrderList(data) {
    return this.reqWithToken({
      method: 'GET',
      url: '/user/pointsMallOrder/findAll',
      data
    })
  }
  // 查订单详情 id
  fetchOrderInfo(data) {
    return this.reqWithToken({
      method: 'GET',
      url: '/user/pointsMallOrder/userOrderId',
      data
    })
  }
  // 查购物车
  fetchCart(data) {
    return this.reqWithToken({
      method: 'GET',
      url: '/user/pointsMallShopping/freeShoppingAll',
      data
    })
  }
  // 余额支付
  payBuyBalance(data) {
    return this.reqWithToken({
      method: 'GET',
      url: '/user/balancePay/pointsMallOrderBalance',
      data
    })
  }
  // 微信支付
  wxPay(data) {
    return this.reqWithToken({
      method: 'GET',
      url: '/api/wx/pay/pointsMallPay',
      data
    })
  }
  // 查栏目列表
  fetchColumnList(data) {
    return this.req({
      method: 'GET',
      url: '/reception/pointsMallColumn/findAll',
      data
    })
  }
}

export {
  Mall
}