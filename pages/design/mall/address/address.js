import {
  Mall
} from '../../../../api/design/mall'
const MallApi = new Mall()
const app = getApp()

Page({

  data: {
    addressList: [],
    defaultAddress: 1,
    canDown: true,
    rules: {
      page: 1,
      rows: 10
    }
  },

  onShow() {
    let userInfo = app.g.userInfo
    if (!userInfo) {
      app.asyncUserInfo = res => {
        if (res) {
          let userInfo = res
          this.setData({
            userInfo,
            addressList: []
          }, () => {
            this.getAddressList()
          })
        }
      }
    } else {
      this.setData({
        userInfo,
        addressList: []
      }, () => {
        this.getAddressList()
      })
    }
  },

  onChange(e) {
    let id = e.target.dataset.id
    let list = this.data.addressList
    let o = list.find(item => item.id == id)
    wx.setStorageSync('userAddress', o)
    this.setData({
      defaultAddress: id
    }, () => {
      wx.navigateBack()
    })
  },

  onReachBottom() {
    const {
      rules
    } = this.data
    rules = ++rules.page
    this.setData({
      rules
    }, () => {
      this.getAddressList()
    })
  },

  getAddressList() {
    const {
      addressList,
      rules
    } = this.data
    MallApi.fetchAddressList(rules)
      .then(res => {
        const {
          rows: list
        } = res.data
        if (list.length) {
          this.setData({
            addressList: addressList.concat(list)
          })
        } else {
          this.setData({
            canDown: false
          })
        }
      })
  },
  edit(e) {
    let id = e.currentTarget.dataset.id || e.target.dataset.id
    wx.navigateTo({
      url: '/pages/my/address/add/add?id=' + id
    })
  },

  del(e) {
    let id = e.currentTarget.dataset.id || e.target.dataset.id

    wx.showModal({
      title: '提示',
      content: `提示是否删除该地址？`,
      showCancel: true,
      success: res => {
        if (res.confirm) {
          MallApi.deleteAddress({shippingAddressId: id})
          .then(() => {
            this.setData({
              addressList: [],
              rules: {
                page: 1,
                rows: 10
              }
            }, () => {
              this.getAddressList()
            })
          })
        }
      }
    })
  },
  goPath(e) {
    const {
      path
    } = e.currentTarget.dataset
    if (path) {
      wx.navigateTo({
        url: path
      })
    }
  },

  add() {
    wx.navigateTo({
      url: '/pages/my/address/add/add',
    })
  },
  // 设置收货地址
  setAddress(e) {
    const {
      id
    } = e.currentTarget.dataset
    const { addressList } = this.data
    let o = addressList.find(item => item.id == id)
    if (o) {
      wx.setStorageSync('shopAddress', o)
      wx.navigateBack()
    }
  }
})