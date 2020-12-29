const app = getApp()
import { Login } from '../../../api/login'
import { User } from '../../../api/user'
import { randomString } from '../../../utils/util'
const LoginApi = new Login()
const UserApi = new User()

Page({
  data: {
    showTopTips: false,
    rules: [ {
      name: 'nickName',
      rules: { required: true, message: '请输入昵称' },
    },{
      name: 'phone',
      rules: [{ required: true, message: '请输入手机号' },{mobile: true, message: '手机格式不对'}]
    }, {
      name: 'password',
      rules: { required: true, message: '请输入密码' },
    }, {
      name: 'verifyCode',
      rules: { required: true, message: '请输入验证码' },
    }],
    formData: {
      phone: "",
      verifyCode: "",
      nickName: "",
      password: "",
      parentId: 0
    },
    deviceId: '',
    userInfo: null,
    cd: 0,
    timer: null
  },
  onLoad() {
    let parentId = wx.getStorageSync('share')
    this.setData({
      deviceId: randomString(),
      "formData.parentId": ~~parentId
    })
  },
  formInputChange(e) {
    const { field } = e.currentTarget.dataset
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
   * 执行注册
   */
  doLogin() {
    LoginApi.doRegister(this.data.deviceId, this.data.formData)
      .then(res => {
        console.log('register', res)
        if (res.status === 200) {
          wx.showToast({
            title: '注册成功',
            duration: 2000,
            mask: true
          })
          setTimeout(() => {
            wx.navigateBack()            
          }, 2000)
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 3000
          })
        }
      }).catch(err => {
        wx.showToast({
          title: '账号或密码有误',
          icon: 'none'
        })
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
    LoginApi.getSMSCode(this.data.deviceId, {phone})
      .then(res => {
        if (res.data == '短信发送成功') {
          wx.showToast({
            title: '短信发送成功',
            icon: 'none'
          })
          this.setCD()
        }
      }).catch(err => {
        wx.showToast({
          title: '系统出错请重试',
          icon: 'none'
        })
      })
  },

  setCD() {
    let cd = 60
    this.data.timer = setInterval(()=> {
      cd -= 1
      this.setData({
        cd
      })
      if (cd <= 0) {
        clearInterval(this.data.timer)
      }
    }, 1000)
  },
  onUnload() {
    clearInterval(this.data.timer)
  }
})