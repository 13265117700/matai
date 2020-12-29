import { HTTP } from '../request/request'
import { randomString } from '../utils/util'
import { config } from '../config'

class Login extends HTTP {
  // 账号密码登录获取token
 login(data) {
    return this.req({
      method: 'POST',
      url: '/oauth/token',
      data
    })
  }
  // 手机号验证码登录
 loginByCode(deviceId, data) {
   console.log(deviceId, data)
   return new Promise(function (resolve, reject) {
      wx.request({
        url: config.api_base_url + '/login/mobile',
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
  // 微信授权登录获取token 这个比较单独特别就不用共用方法了
  wxLogin(wxData) {
    console.log(1121212)
    return new Promise(function (resolve, reject) {
      // 登录
        wx.request({
          url: config.api_base_url + '/login/code',
          method: 'POST',
          header: {
            'Authorization': 'Basic Y3M6Y3Nvbw==',
            'deviceId': randomString(),
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            ...wxData
          },
          success: res => {
            resolve(res.data)            
          },
          fail: err => {
            wx.showToast({
              title: '授权失败，请重试！',
              icon: 'none'
            })
            reject(null)
          }
        })

    })
  }

  // 刷新token
  refreshToken(refresh_token) {
    return this.req({
      method: 'POST',
      url: '/oauth/token',
      data: {
        grant_type: 'refresh_token',
        refresh_token
      }
    })
  }

  // 获取登录验证码 这个比较单独特别就不用共用方法了 mobile
  getLoginSMSCode(deviceId, data) {
    return new Promise(function (resolve, reject) {
      // 登录
        wx.request({
          url: config.api_base_url + '/code/sms',
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
  // 忘记密码验证码 phone
  getForgetSMSCode(deviceId, data) {
    return new Promise(function (resolve, reject) {
      // 登录
        wx.request({
          url: config.api_base_url + '/registeSms/forgetPassword',
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
  // 忘记密码找回 
  getForgetPassword(data) {
    return this.req({
      method: 'POST',
      url: '/user/information/forgetPassword',
      data
    })
  }
  // 获取注册验证码 这个比较单独特别就不用共用方法了
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
  // 执行注册
  doRegister(deviceId, data) {
    return new Promise(function (resolve, reject) {
      // 登录
        wx.request({
          url: config.api_base_url + '/login/register',
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

}

export { Login }