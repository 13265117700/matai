import { HTTP } from '../../request/request'

class Vip extends HTTP {
  // 查看会员组列表
  fetchList(data) {
    return this.req({
      method: 'GET',
      url: '/reception/userGroup/answerFindAll',
      data
    })
  }
  // 查看是否已购买该会员组 传入会员组id
  fetchOrder(id) {
    return this.reqWithToken({
      method: 'GET',
      url: '/user/userGroupOrder/findAll?page=1&rows=1&status=1&userGroupId=' + id
    })
  }
  // 创建订单 传入会员组id
  createOrder(id) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/userGroupOrder/create?groupId=' + id
    })
  }
  /**
   * 拉起支付 
   */
  wxPay(data) {
    return this.reqWithToken({
      method: 'GET',
      url: '/api/wx/pay/userGroupPay',
      data
    })
  }
  // 余额支付
  payBuyBalance(data) {
    return this.reqWithToken({
      method: 'GET',
      url: '/user/balancePay/userGroupBalancePay',
      data
    })
  }

  // 查订单列表
  fetchOrderList(data) {
    return this.reqWithToken({
      method: 'GET',
      url: '/user/userGroupOrder/findAll',
      data
    })
  }
}

export { Vip }
