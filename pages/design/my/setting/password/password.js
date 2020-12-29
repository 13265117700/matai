const app = getApp()
import { Safe } from '../../../../../api/design/safe'
const SafeApi = new Safe()

Page({
  data: {
    showTopTips: false,
    rules: [{
      name: 'newPassword',
      rules: [{ required: true, message: '请输入新密码' }]
    },{
      name: 'confirmNewPassword',
      rules: [{ required: true, message: '请再次输入新密码' }]
    },{
      name: 'code',
      rules: { required: true, message: '请输入验证码' },
    }],
    formData: {
      code: '', // *string(query)	验证码
      confirmNewPassword: '', // *string(query)	确认新密码
      newPassword: '', // *string(query)	新密码
      oldPassword: '', // *string(query)	旧密码
    },
    userInfo: {},
    cd: 0,
    timer: null
  },
  onShow() {
    const userInfo = app.g.userInfo
    let phone = userInfo.phone
    if (!phone) {
      wx.showModal({
        cancelColor: '',
        title: '该操作需要先绑定手机号',
        content: '是否前往设置手机号？',
        success: res => {
          if (res.confirm) {
            wx.navigateTo({
              url: '../phone/phone',
            })
          } else {
            wx.navigateBack()
          }
        }
      })
    }
    this.setData({
      userInfo
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
   * 执行
   */
  doLogin() {
    const { formData } = this.data
    if (formData.newPassword !== formData.confirmNewPassword) {
      return wx.showToast({
        title: '两次输入的密码不一致',
        icon: 'none'
      })
    }
    SafeApi.updatePassword(this.data.formData)
      .then(res => {
        console.log('updatePassword', res)
        if (res.status === 200 && res.data === '密码修改完成') {
          wx.showToast({
            title: '修改成功',
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
    SafeApi.getSMSCode2()
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