import {
  Login
} from './api/login'
import {
  User
} from './api/user'

import utils from './utils/util'
import FN from './utils/FN'
const LoginApi = new Login()
const UserApi = new User()

import {
  Product
} from '/api/design/product.js'
const ProductApi = new Product()

App({
  onShow(){
    ProductApi.getGlobalSettings().then(res => {
      let appletPaymentSwitch = res.data.appletPaymentSwitch;
      console.log(appletPaymentSwitch)
      if(appletPaymentSwitch === 1){
        if(this.checkLogin()){
          return
        }
      }
    })
  },
  onLaunch: function (e) {
    // 查看是否有token, 有的话做自动登录 
    this.refreshToken()
    const {
      scene,
      share
    } = e.query
    if (scene) {
      wx.setStorageSync('share', ~~scene)
    } else if (share) {
      wx.setStorageSync('share', ~~share)
    }
    this.updateManage()
  },
  updateManage() {
    // wx.getUpdateManager 在 1.9.90 才可用，请注意兼容
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否马上重启小程序？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      console.log('新的版本下载失败')
    })
  },
  refreshToken() {
    const {
      refresh_token
    } = wx.getStorageSync('tokens')
    if (refresh_token) {
      LoginApi.refreshToken(refresh_token)
        .then(res => {
          this.g.tokens = res
          wx.setStorageSync('tokens', res) // 设置Storage 方便 request.js使用
          this.getServerUserInfo()
        })
    }
  },
  getServerUserInfo(cb) {
    const {
      refresh_token
    } = wx.getStorageSync('tokens')
    if (refresh_token) {
      LoginApi.refreshToken(refresh_token)
        .then(res => {
          this.g.tokens = res
          wx.setStorageSync('tokens', res) // 设置Storage 方便 request.js使用
          UserApi.fetchInfo()
            .then(res => {
              console.log(res)
              if (res.status === 200) {
                let data = res.data
                data.faceImage = data.faceImage || 'http://csyimg.oss-cn-shenzhen.aliyuncs.com/images/2020/07/17/15949519098579878.jpg' // 默认头像
                this.g.userInfo = data
                cb && cb(data)
                if (this.asyncUserInfo) {
                  this.asyncUserInfo(this.g.userInfo)
                }
              }
            }).catch(err => {
              console.log(err)
              wx.showToast({
                title: '网络出错，请稍后再试',
                icon: 'none'
              })
            })
        })
    }
  },
  /**
   * globalData app全局变量 方便页面调用
   * @returns {object} userInfo - 用户信息
   * @returns {object} token - 用户登陆成功后的token
   */
  g: {
    userInfo: null,
    tokens: null
  },
  utils: utils,
  FN: FN,
  // 查询是否已登录
  checkLogin(notLogin) {
    console.log(this.g.userInfo)
    let tokens = wx.getStorageSync('tokens')
    console.log(wx.getStorageSync('tokens'))
    if (!tokens) {
      if (!notLogin) {
        wx.navigateTo({
          url: '/pages/auth/auth'
        })
      }
      return true
    }
  },
  // 查询是否已绑定手机号
  checkBindPhone(noBack) {
    let {
      userInfo
    } = this.g
    if (userInfo && !userInfo.phone) {
      wx.showModal({
        title: '此操作需要绑定手机号',
        content: '是否去绑定手机号？',
        success: res => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/design/my/setting/phone/phone'
            })
          } else {
            noBack ? '' : wx.navigateBack()
          }
        }
      })
    }
  },
  sssssssss() {
    let sssssssss = Boolean(wx.getStorageSync('app'))
    if (!sssssssss) {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
  }
})