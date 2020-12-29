import {
  HTTP
} from '../../request/request'

class Order extends HTTP {
  // 查订单列表
  fetchList(data) {
    return this.reqWithToken({
      method: 'GET',
      url: '/user/order/findAll',
      data
    })
  }
  // 查订单info 传入 id
  fetchInfo(id) {
    return this.reqWithToken({
      method: 'GET',
      url: '/user/order/userOrderId',
      data: {
        id
      }
    })
  }
  // 创建作品订单
  createOrder(data) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/order/create',
      data
    })
  }
  /**
   * 创建共享分订单
   * @param {detailedWorksId, years} data 
   */
  createSharePointOrder(data) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/order/createSharingPoints',
      data
    })
  }
  /**
   * 获取订单详情
   */
  getInfo(orderId) {
    return this.reqWithToken({
      method: 'GET',
      url: '/user/order/userOrderId',
      data: {id: orderId}
    })
  }
  /**
   * 使用微信支付
   */
  wxPay(data) {
    return this.reqWithToken({
      method: 'GET',
      url: '/api/wx/pay/designerWorksPay',
      data
    })
  }
  /**
   * 使用余额支付
   */
  yePay(data) {
    return this.reqWithToken({
      method: 'GET',
      url: '/user/balancePay/balancePayOrder',
      data
    })
  }
}

export {
  Order
}