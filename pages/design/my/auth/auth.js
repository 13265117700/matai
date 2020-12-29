import { DesignerAuth } from '../../../../api/design/designerAuth'
let api = new DesignerAuth()
const app = getApp()
var desigField = require('../../../../data/desigfield')
Page({
  data: {
    userInfo: {},
    showTopTips: false,

    countries: [],
    countryIndex: 0,
    form: {
      IdCardNo: '', // *string(query)	身份证号码
      IdCardNoBack: '', // *string(query)	身份证反面图
      IdCardNoJust: '', // *string(query)	身份证正面图
      idEntity: 1, // *integer($int32)(query)	设计领域
      realName: '', // *string(query)	真实姓名
    },
    IdCardNoJust: 'http://csyimg.oss-cn-shenzhen.aliyuncs.com/images/2020/07/10/15943764170088826.png', // 这个是正面默认图
    IdCardNoBack: 'http://csyimg.oss-cn-shenzhen.aliyuncs.com/images/2020/07/10/15943763867684205.png', // 这个是背面默认图
    designer: 3, // 设计师认证状态：1:没认证,2:审核中,3:审核失败,4:设计师,5:签约设计师
    designerInfo: {}
  },

  onLoad: function () {
    app.sssssssss()
    let countries = [].concat(desigField.desigFieldList)
    countries.shift()

    app.getServerUserInfo( userInfo => {
      this.setData({
        userInfo,
        designer: userInfo.designer,
        countries,
        designerInfo: userInfo.csDesigner || {}
      })
    })
  },
  back() {
    wx.navigateBack()
  },

  // 上传图片
  uploadImg(e) {
    let {
      name
    } = e.currentTarget.dataset
    let s = `form.${name}`
    app.FN.uploadImg()
      .then(res => {
        console.log(res)
        this.setData({
          [s]: res
        })
      })
  },
  // 提交认证
  submit() {
    let form = this.data.form
    for (let i in form) {
      if (form[i] === '') {
        return wx.showToast({
          title: '请填写完整表单',
          icon: 'none'
        })
      }
    }

    if (this.data.userInfo.designer == 1) {
      api.toAuth(form)
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            wx.showModal({
              title: '提交成功',
              content: '请耐心等候审核通过',
              showCancel: false,
              success: () => {
                wx.navigateBack()
              }
            })
            app.getServerUserInfo()
          } else {
            wx.showToast({
              title: res.msg,
              icon: 'none'
            })
          }
        })
    } else {
      api.reAuth(form)
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            wx.showModal({
              title: '提交成功',
              content: '请耐心等候审核通过',
              showCancel: false,
              success: () => {
                wx.navigateBack()
              }
            })
            app.getServerUserInfo()
          } else {
            wx.showToast({
              title: res.msg,
              icon: 'none'
            })
          }
        })
    }
  },

  reAuth() {
    this.setData({
      designer: 1
    })
  },

  /**
   * form
   */
  bindCountryChange: function (e) {
    let countries = this.data.countries
    let countryIndex = e.detail.value
    this.setData({
      countryIndex,
      "form.idEntity": countries[~~e.detail.value].id
    })
  },
  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`form.${field}`]: e.detail.value
    })
  },
})