import { HTTP } from '../../request/request'

class WithDrawal extends HTTP {
  /**
   * 提现列表
   * @param {page, rows, status}
   */
  fetchList(data) {
    return this.reqWithToken({
      method: 'GET',
      url: '/user/withdrawal/findAll',
      data
    })
  }
  /**
   * 
   * @param {userPaymentId,withdrawalAmount} 提现账户id 提现金额
   */
  doWithDrawal(data) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/withdrawal/create',
      data
    })
  }
  /**
   * 
   * @param {id: Number}
   */
  cancelWithDrawal(data) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/withdrawal/cancel',
      data
    })
  }
}

export { WithDrawal }
