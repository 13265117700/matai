import { HTTP } from '../../request/request'

class Transaction extends HTTP {
  /**
   * 明细列表
   * @param {page, rows, status}
   */
  fetchList(data) {
    return this.reqWithToken({
      method: 'GET',
      url: '/user/transactionRecords/findAll',
      data
    })
  }
}

export { Transaction }
