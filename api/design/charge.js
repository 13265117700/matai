import { HTTP } from '../../request/request'

class Charge extends HTTP {
  /**
   * 充值列表
   * @param {page, rows, status}
   */
  fetchList(data) {
    return this.reqWithToken({
      method: 'GET',
      url: '/user/balanceRechargeOrder/findAll',
      data
    })
  }
  /**
   * 
   * @param {price} 充值金额
   */
  doCharge(data) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/balanceRechargeOrder/create',
      data
    })
  }
  /**
   * 拉起支付 
   */
  wxPay(data) {
    return this.reqWithToken({
      method: 'GET',
      url: '/api/wx/pay/balanceRechargePay',
      data
    })
  }
}

export { Charge }
