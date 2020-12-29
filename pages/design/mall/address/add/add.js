import {
  Mall
} from '../../../../../api/design/mall'
const MallApi = new Mall()
const app = getApp()

Page({
  data: {
    userInfo: {},
    showTopTips: false,
    id: 0,
    countries: [],
    countryIndex: 0,
    form: {
      defaultAddress: 0, // *integer($int32)(query)	默认地址 1.默认地址 2.非默认地址
      detailedAddress: '', // *string(query)	详细地址填写
      name: '', // *string(query)	收货人
      phone: '', // *string(query)	手机号
      provinceCity: '', // *string(query)	省,市,区/县
    },
    region: ['广东省', '广州市', '海珠区'],
    isEdit: false
  },

  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  onLoad: function (options) {
    const { id } = options
    let userInfo = app.g.userInfo
    if (!userInfo) {
      app.asyncUserInfo = res => {
        if (res) {
          let userInfo = res
          this.setData({
            userInfo,
            id
          })
          this.getAddressInfo(id)
        }
      }
    } else {
      if (id) {
        wx.setNavigationBarTitle({
          title: '编辑收货地址',
        })
        this.setData({
          id,
          userInfo
        })
        this.getAddressInfo(id)
      }
    }
  },

  getAddressInfo(id) {
    const { form } = this.data
    MallApi.fetchAddressInfo({id})
      .then(res => {
        if (res.state == 200) {
          const data = res.data
          for (const i in form) {
            form[i] = data[i]
          }
          form.defaultAddress = form.defaultAddress == 1 ? 1 : 0
          form.shippingAddressId = data.id
          this.setData({
            form,
            isEdit: true,
            region: data.provinceCity.split('-')
          })
        }
      })
  },
  back() {
    wx.navigateBack()
  },
  defaultChange(e) {
    let {
      value
    } = e.detail
    this.setData({
      "form.defaultAddress": ~~value
    })
  },
  submit() {
    const { isEdit } = this.data
    if (isEdit) {
      this.updateAddress()
    } else {
      this.addAddress()
    }
  },
  // 新增地址
  addAddress() {
    let {form, region} = this.data
    form.provinceCity = region.toString().replace(/,/g,'-')
    for (let i in form) {
      if (form[i] === '') {
        return wx.showToast({
          title: '请填写完整表单',
          icon: 'none'
        })
      }
    }
    MallApi.createAddress(form)
      .then(res => {
        if (res.state == 200) {

          wx.showToast({
            title: '添加成功',
            icon: 'none',
            mask: true
          })
          setTimeout(() => {
            wx.navigateBack()            
          }, 2000);
        }
      })
  },
  // 更新地址
  updateAddress() {
    let {form, region} = this.data
    form.provinceCity = region.toString().replace(/,/g,'-')
    for (let i in form) {
      if (form[i] === '') {
        return wx.showToast({
          title: '请填写完整表单',
          icon: 'none'
        })
      }
    }
    MallApi.updateAddress(form)
      .then(res => {
        if (res.state == 200) {
          wx.showToast({
            title: '修改成功',
            icon: 'none',
            mask: true
          })
          setTimeout(() => {
            wx.navigateBack()            
          }, 2000);
        }
      })
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
    // let countries = this.data.countries
    // let countryIndex = e.detail.value
    // this.setData({
    //   countryIndex,
    //   "form.idEntity": countries[~~e.detail.value].id
    // })
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