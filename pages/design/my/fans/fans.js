import {
  User
} from '../../../../api/user'
const UserApi = new User()
const app = getApp()
var desigField = require('../../../../data/desigfield.js')
Page({
  data: {
    list: [],
    rules: {
      page: 1,
      rows: 20,
      choice: 2 // 1.查询我关注得人，2查询我得粉丝
    },
    canDown: true
  },

  onLoad: function (options) {
    const id = options.id
    this.setData({
      "rules.uId": id
    }, () => {
      this.getList()
    })
  },

  back() {
    wx.navigateBack()
  },

  getList() {
    let {
      rules,
      list
    } = this.data
    UserApi.fetchFollowList(rules)
      .then(res => {
        if (res.status == 200 && res.data) {
          let nList = res.data.rows
          let arr = []
          for (let i = 0; i < nList.length; i++) {
            let index = nList[i].csUser.occupation
            if (index) {
              nList[i].csUser.occupationText = desigField.desigFieldList[index].name
            }
            arr.push(nList[i].csUser)
          }
          list = list.concat(arr)
          this.setData({
            list
          })
        } else {
          this.setData({
            canDown: false
          })
        }
      })
  },
  onReachBottom() {
    const {
      canDown,
      rules
    } = this.data
    if (canDown) {
      rules.page = ++rules.page
      this.setData({
        rules
      }, () => {
        this.getList()
      })
    }
  },
  goPath(e) {
    const {
      path
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: path
    })
  },

})