import { HTTP } from '../../request/request'

class DesignerAuth extends HTTP {
  // 初次认证
  toAuth(data) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/designer/designerCertification',
      data
    })
  }
  // 二次认证
  reAuth(data) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/designer/modifyDesigner',
      data
    })
  }
}

export { DesignerAuth }
