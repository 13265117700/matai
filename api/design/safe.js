import { HTTP } from '../../request/request'
import { config } from '../../config'

class Safe extends HTTP {
  
  // 获取注册验证码，手机新绑也是用这个 这个比较单独特别就不用共用方法了
  getSMSCode(deviceId, data) {
    return new Promise(function (resolve, reject) {
      // 登录
        wx.request({
          url: config.api_base_url + '/registeSms/sendSmsPhone',
          method: 'POST',
          header: {
            'Authorization': 'Basic Y3M6Y3Nvbw==',
            deviceId,
            'content-type': 'application/x-www-form-urlencoded'
          },
          data,
          success: res => {
            resolve(res.data)            
          },
          fail: err => {
            wx.showToast({
              title: '系统出错，请重试',
              icon: 'none'
            })
            reject(null)
          }
        })

    })
  }
  // 执行绑定手机
  doUpdate(data) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/information/phoneBinding',
      data
    })
  }
  // 修改密码
  updatePassword(data) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/information/changePassword',
      data
    })
  }
  // 修改密码手机验证码
  getSMSCode2() {
    return this.reqWithToken({
      method: 'POST',
      url: '/registeSms/changePassword'
    })
  }
}

export { Safe }