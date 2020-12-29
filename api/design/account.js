import { HTTP } from '../../request/request'

class Account extends HTTP {
  /**
   * 收款账号列表
   */
  fetchList() {
    return this.reqWithToken({
      method: 'GET',
      url: '/user/payment/viewF'
    })
  }
  /**
   * 
   * @param {} 创建收款账号信息
   */
  addAccount(data) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/payment/create',
      data
    })
  }
  /**
   * 
   * @param {} 修改收款账号信息
   */
  updateAccount(data) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/payment/update',
      data
    })
  }
  /**
   * 
   * @param {} 重要信息变更验证码
   */
  getSMS() {
    return this.reqWithToken({
      method: 'POST',
      url: '/registeSms/information'
    })
  }
}

export { Account }
