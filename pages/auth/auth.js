const app = getApp()
import {
  Login
} from '../../api/login'
import {
  User
} from '../../api/user'
const LoginApi = new Login()
const UserApi = new User()

import {
  Product
} from '../../api/design/product.js'
const ProductApi = new Product()

Page({
  data: {
    showTopTips: false,
    rules: [{
      name: 'username',
      rules: {
        required: true,
        message: '请输入手机号'
      },
    }],
    formData: {
      phone: ''
    },
    userInfo: null
  },
  onUnload:function(){
    ProductApi.getGlobalSettings().then(res => {
      console.log(res)
      let appletPaymentSwitch = res.data.appletPaymentSwitch;
      console.log(appletPaymentSwitch)
      if(appletPaymentSwitch === 1){
        if(app.checkLogin()){
          return
        }
      }
    })
  },
  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  // 登录校验
  submitForm() {
    this.selectComponent('#form').validate((valid, errors) => {
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })
        }
      } else {
        this.doLogin()
      }
    })
  },
  /**
   * 执行登录 获取token
   */
  doLogin() {
    LoginApi.login(this.data.formData)
      .then(res => {
        app.g.tokens = res
        wx.setStorageSync('tokens', res) // 设置Storage 方便 request.js使用
        this.getServerUserInfo()

      }).catch(err => {
        wx.showToast({
          title: '账号或密码有误',
          icon: 'none'
        })
      })
  },
  /**
   * 获取用户信息
   */
  getServerUserInfo() {
    UserApi.fetchInfo()
      .then(res => {
        if (res.status === 200) {
          res.data.faceImage = res.data.faceImage || 'http://csyimg.oss-cn-shenzhen.aliyuncs.com/images/2020/07/17/15949519098579878.jpg' // 默认头像
          app.g.userInfo = res.data // 给全局添加用户信息，方便所有页面使用
          this.setData({
            userInfo: res.data
          })
        }
        wx.navigateBack()
      }).catch(err => {
        wx.showToast({
          title: '网络出错，请稍后再试',
          icon: 'none'
        })
      })
  },
  back() {
    wx.navigateBack()
  },
  /**
   * 微信授权获取token
   */
  getUserInfo: function (e) {

    if (e.detail.userInfo) {
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          let scene = wx.getStorageSync('share') || wx.getStorageSync('scene')
          let parentId = 0
          if (scene) {
            parentId = scene
          }

          let data = {
            code: res.code,
            rawData: e.detail.rawData,
            signature: e.detail.signature,
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv,
            parentId: parentId,
          }
          LoginApi.wxLogin(data).then(res => {
            if (!res.access_token) {
              wx.hideLoading()
              this.getTokens()
            }
            app.g.tokens = res
            wx.setStorageSync('tokens', res) // 设置Storage 方便 request.js使用
            this.getServerUserInfo()
          })
        }
      })
    }
  },

  getTokens() {
    wx.getUserInfo({
      lang: 'zh_CN',
      success: e => {
        console.log(e)
        if (e.userInfo) {
          wx.login({
            success: res => {
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              let scene = wx.getStorageSync('share') || wx.getStorageSync('scene')
              let parentId = 0
              if (scene) {
                parentId = scene
              }

              let data = {
                code: res.code,
                rawData: e.rawData,
                signature: e.signature,
                encryptedData: e.encryptedData,
                iv: e.iv,
                parentId: parentId,
              }
              LoginApi.wxLogin(data).then(res => {
                if (!res.access_token) {
                  wx.hideLoading()
                  return wx.showToast({
                    title: '授权失败，请重试！',
                    icon: 'none'
                  })
                }
                app.g.tokens = res
                wx.setStorageSync('tokens', res) // 设置Storage 方便 request.js使用
                this.getServerUserInfo()
              })
            }
          })
        }
      }
    })
  },
  goRegister() {
    wx.navigateTo({
      url: './register/register',
    })
  },
  goPath(e) {
    const {
      path
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: path
    })
  },
  goPath2(e) {
    const {
      path
    } = e.currentTarget.dataset
    const { phone } = this.data.formData
    if (phone.length !== 11) {
      return
    }
    wx.navigateTo({
      url: path + `?phone=${phone}`
    })
  },

})