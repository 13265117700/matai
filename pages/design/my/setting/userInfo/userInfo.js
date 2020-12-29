const desigField = require('../../../../../data/desigfield')
import {
  User
} from '../../../../../api/user'
const UserApi = new User()
const app = getApp()
Page({
  data: {
    form: {
      city: '', // string(query)	城市
      faceImage: '', // string(query)	头像
      gender: '', // integer($int32)(query)	性别
      nickName: '', // string(query)	用户名
      occupation: '', // string(query)	职业
    },
    countries: [],
    countryIndex: 0,
    genders: [{
        id: 0,
        name: '女'
      },
      {
        id: 1,
        name: '男'
      }
    ],
    genderIndex: 0,
    region: [],
    userInfo: {}
  },
  onLoad() {
    let countries = desigField.desigFieldList
    countries[0].name = '未选择'
    let userInfo = app.g.userInfo
    this.setData({
      userInfo,
      countries,
      region: userInfo.city ? userInfo.city.split('-') : [],
      "form.nickName": userInfo.nickName,
      "form.faceImage": userInfo.faceImage,
      "form.gender": userInfo.gender,
      "form.city": userInfo.city || '',
      "form.occupation": userInfo.occupation || '',
      genderIndex: userInfo.gender,
      countryIndex: userInfo.occupation || 0
    })
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
    let {form, userInfo} = this.data
    for (let i in form) {
      if (form[i] === '') {
        return wx.showToast({
          title: '请填写完整表单',
          icon: 'none'
        })
      }
    }
    if (form.nickName === userInfo.nickName) {
      delete form.nickName
    }
    wx.showLoading({
      title: '',
      mask: true
    })

    UserApi.updateInfo(form)
      .then(res => {
        wx.hideLoading()
        if (res.status === 200) {
          wx.showToast({
            title: '修改成功',
          })
          app.getServerUserInfo()
          setTimeout(() => {
            wx.navigateBack()
          }, 2000);
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
      })
  },


  /**
   * form
   */
  bindCountryChange: function (e) {
    let countries = this.data.countries
    let countryIndex = e.detail.value
    let id = countries[~~e.detail.value].id
    this.setData({
      countryIndex,
      "form.occupation": ~~id || ''
    })
  },
  bindGenderChange: function (e) {
    let genders = this.data.genders
    let genderIndex = e.detail.value
    this.setData({
      genderIndex,
      "form.gender": genders[~~e.detail.value].id
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
  bindRegionChange: function (e) {
    let city = e.detail.value
    this.setData({
      region: city,
      "form.city": city.toString().replace(/,/g, '-')
    })
  }
})