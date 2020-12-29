import { HTTP } from '../../request/request'

class ADPicture extends HTTP {
  // 查广告图
  fetchList(data) {
    return this.req({
      method: 'GET',
      url: '/admin/advertisingMap/answerFindAll',
      data
    })
  }
}

export { ADPicture }
