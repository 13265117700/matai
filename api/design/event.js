import { HTTP } from '../../request/request'

class EventApi extends HTTP {
  // 获取活动列表
  fetchList(data) {
    return this.req({
      method: 'GET',
      url: '/reception/article/articleFindAll',
      data
    })
  }
  // 获取活动详情
  fetchInfo(data) {
    return this.req({
      method: 'GET',
      url: '/reception/article/viewArticleId',
      data
    })
  }
}

export { EventApi }
