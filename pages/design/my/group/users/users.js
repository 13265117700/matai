import {
  Groups
} from '../../../../../api/design/group'
const groupApi = new Groups()
const app = getApp()
Page({
  data: {
    tabs: [{
        id: 1,
        name: '一级分销商'
      },
      {
        id: 2,
        name: '二级分销商'
      }
    ],
    rules: {
      page: 1,
      rows: 20,
      level: 1
    },
    currentTab: 1,
    list: [],
    totals: 0,
    total1: 0,
    total2: 0,
    canDown: true
  },

  onLoad() {
    app.sssssssss()
    let userInfo = app.g.userInfo
    if (!userInfo) {
      app.asyncUserInfo = res => {
        if (res) {
          let userInfo = res
          this.setData({
            userInfo,
          })
          this.getList()
        }
      }
    } else {
      this.getList()
    }
  },
  // 查分销下线总数
  getList() {
    let totals = 0
    let {tabs} = this.data
    groupApi.fetchList({
        level: 1,
        page: 1,
        rows: 18
      })
      .then(res => {
        const {
          total: total1,
          rows
        } = res.data
        totals += total1
        groupApi.fetchList({
            level: 2,
            page: 1,
            rows: 1
          })
          .then(res => {
            const {
              total: total2
            } = res.data
            totals += total2
            this.setData({
              totals,
              list: rows,
              "tabs[0].name": tabs[0].name + `（${total1}）`,
              total1,
              "tabs[1].name": tabs[1].name + `（${total2}）`,
              total2
            })
            wx.setNavigationBarTitle({
              title: `关联客户（${totals}）`
            })
          })
      })
  },
  getOrderList() {
    let list = this.data.list
    groupApi.fetchList(this.data.rules)
      .then(res => {
        const {
          rows
        } = res.data
        if (rows.length) {
          list = list.concat(rows)
          this.setData({
            list
          })
        } else {
          this.setData({
            showNoData: true,
            canDown: false
          })
        }
      })
  },
  tabChange(e) {
    const {
      status
    } = e.currentTarget.dataset
    let rules = this.data.rules
    rules.page = 1
    rules.level = status

    this.setData({
      canDown: true,
      list: [],
      rules,
      showNoData: false,
      currentTab: status
    }, () => {
      this.getOrderList()
    })
  },
  onReachBottom() {
    if (!this.data.canDown) {
      return
    }
    let rules = this.data.rules
    rules.page = ++rules.page
    this.setData({
      rules
    }, () => {
      this.getOrderList()
    })
  },

})