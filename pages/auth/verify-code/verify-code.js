const app = getApp()
import {
  Login
} from '../../../api/login'
import {
  User
} from '../../../api/user'
const LoginApi = new Login()
const UserApi = new User()

Page({

  data: {
    phone: '',
    cd: 0,
    formData: {
      phone: '',
      verifyCode: ''
    },
    deviceId: '',
    timer: null,
    userInfo: {}
  },

  onLoad: function (options) {
    const {
      phone
    } = options
    this.setData({
      "formData.phone": phone,
      deviceId: app.utils.randomString(32)
    }, () => {
      this.getSMS()
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
  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  getSMS() {
    const phone = this.data.formData.phone
    if (this.data.cd) {
      return
    }
    if (phone.length !== 11) {
      wx.showToast({
        title: '请填写正确的手机号',
        icon: 'none'
      })
      return
    }
    LoginApi.getLoginSMSCode(this.data.deviceId, {
        mobile: phone
      })
      .then(res => {
        if (res.data == '短信发送成功') {
          wx.showToast({
            title: '短信发送成功',
            icon: 'none'
          })
        }
        this.setCD()
      }).catch(err => {
        wx.showToast({
          title: '系统出错请重试',
          icon: 'none'
        })
      })
  },

  setCD() {
    let cd = 60
    this.data.timer = setInterval(() => {
      cd -= 1
      this.setData({
        cd
      })
      if (cd <= 0) {
        clearInterval(this.data.timer)
      }
    }, 1000)
  },
  /**
   * 执行登录 获取token
   */
  doLogin() {
    const {
      deviceId,
      formData
    } = this.data
    let data = {
      mobile: formData.phone,
      smsCode: formData.verifyCode
    }
    LoginApi.loginByCode(deviceId, data)
      .then(res => {
        app.g.tokens = res
        wx.setStorageSync('tokens', res) // 设置Storage 方便 request.js使用
        this.getServerUserInfo()
      }).catch(err => {
        wx.showToast({
          title: '手机号或验证码有误',
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
        wx.navigateBack({
          delta: 2
        })
      }).catch(err => {
        wx.showToast({
          title: '手机号或验证码有误',
          icon: 'none'
        })
      })
  },
  onUnload() {
    clearInterval(this.data.timer)
  }
})