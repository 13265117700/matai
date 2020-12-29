import { HTTP } from '../../request/request'

class EWM extends HTTP {
  // 获取用户二维码 传入用户推广id
  getEWM(popularizeId) {
    return this.reqWithToken({
      method: 'GET',
      url: '/wx/user/distribution/createWxAqrCode?width=231',
      data: {
        path: `pages/index/index?share=${popularizeId}`
      }
    })
  }
}

export { EWM }
