import {
  Mall
} from '../../../../api/design/mall'
const MallApi = new Mall()
const app = getApp()
Page({

  data: {
    height: 0,
    columnList: [],
    secondColumnList: [],
    current: 1,
    currentTag: {}
  },

  onLoad: function (options) {
    let sysInfo = app.globalSystemInfo
    if (sysInfo) {
      this.setData({
        height: sysInfo.navBarHeight + sysInfo.navBarExtendHeight
      })
    }
    this.fetColumnList()
  },
  onShow() {
    let Shinjitunopage = Boolean(wx.getStorageSync('app'))
    if (!Shinjitunopage) {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
  },
  fetColumnList() {
    MallApi.fetchColumnList({pId: 0, page: 1, rows: 1000})
      .then(res => {
        if (res.state == 200 && res.data) {
          let columnList = res.data.rows
          let current = columnList[0].id
          this.setData({
            columnList,
            current,
            currentTag: columnList[0]
          }, () => {
            this.fetSecondColumnList(current)
          })
        }
      })
  },
  fetSecondColumnList(pId) {
    MallApi.fetchColumnList({pId, page: 1, rows: 1000})
      .then(res => {
        if (res.state == 200 && res.data) {
          let secondColumnList = res.data.rows
          this.setData({
            secondColumnList
          })
        }
      })
  },
  changeTag(e) {
    const { id } = e.currentTarget.dataset
    const { columnList } = this.data
    let o = columnList.find(item => item.id == id)
    this.setData({
      current: id,
      currentTag: o
    }, () => {
      this.fetSecondColumnList(id)
    })
  },
  back() {
    wx.navigateBack()
  },
  goSearch(e) {
    const { id, name } = e.currentTarget.dataset
    wx.navigateTo({
      url: `../search/search?pointsMallColumnId=${id}&name=${name}`,
    })
  },
  goPath(e) {
    const { path } = e.currentTarget.dataset
    wx.navigateTo({
      url: path
    })
  },
})