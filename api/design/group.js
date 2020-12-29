import { HTTP } from '../../request/request'

class Groups extends HTTP {
  // 查分销下线
  fetchList(data) {
    return this.reqWithToken({
      method: 'GET',
      url: '/user/information/distributionFindAll',
      data
    })
  }
}

export { Groups }
