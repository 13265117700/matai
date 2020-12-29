const app = getApp()
import {
  Safe
} from '../../../../../api/design/safe'
const SafeApi = new Safe()

Page({
  data: {
    showTopTips: false,
    rules: [{
      name: 'phone',
      rules: [{
        required: true,
        message: '请输入手机号'
      }, {
        mobile: true,
        message: '手机格式不对'
      }]
    }, {
      name: 'code',
      rules: {
        required: true,
        message: '请输入验证码'
      },
    }],
    formData: {
      phone: "",
      code: ""
    },
    userInfo: {},
    cd: 0,
    timer: null
  },
  onLoad() {
    const userInfo = app.g.userInfo
    this.setData({
      userInfo
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
   * 执行
   */
  doLogin() {
    SafeApi.doUpdate(this.data.formData)
      .then(res => {
        console.log('doUpdate', res)
        if (res.status === 200 && res.data === '绑定成功') {
          wx.showToast({
            title: '绑定成功',
            duration: 2000,
            mask: true
          })
          app.getServerUserInfo(() => {
            setTimeout(() => {
              wx.navigateBack()
            }, 2000)
          })
        } else {
          wx.showToast({
            title: res.data,
            icon: 'none',
            duration: 3000
          })
        }
      }).catch(err => {
        wx.showToast({
          title: '系统错误，请稍后重试',
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
    SafeApi.getSMSCode(app.utils.randomString(32), {
        phone
      })
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
  onUnload() {
    clearInterval(this.data.timer)
  }
})