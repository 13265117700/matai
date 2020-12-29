import {
  Mall
} from '../../../../api/design/mall'
const MallApi = new Mall()
const app = getApp()

Page({

  data: {
    list: [],
    history: [],
    lisss: 1, // 默认为1
    rules: {
      page: 1,
      rows: 20,
      name: "",
    },
    oldId: '', // 传入的原栏目id
    columnList: [],
    subRules: {}, // 更多的筛选条件
    tabList: [
      { state: 3, name: '综合排序', icon: '', setType: true },
      { state: 4, name: '销量', icon: '', setType: true },
      { state: 6, name: '最新上架', icon: '', setType: true },
      { state: 99, name: '筛选', icon: '/images/icon/sx@2x.png', setType: false }
    ],
    currentTab: 3,
    ctHeight: 40, // 抽屉容器高度
    ctShow: false // 是否弹出抽屉
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { pointsMallColumnId, name } = options
    let _this = this;

    if (pointsMallColumnId && name) {
      // 如果是从分类里面查找进来的, 还要去查子栏目
      this.setData({
        lisss: 0,
        oldId: pointsMallColumnId,
        "rules.pointsMallColumnId": pointsMallColumnId,
        "rules.fatherAndSon": 2
      }, () => {
        this.getList()
        this.getColumnList(pointsMallColumnId)
      })
    } else {
      wx.getStorage({
        key: 'mallName',
        success: function(res) {
          console.log(res)
          let history = res.data;
          _this.setData({
            history,
          })
        },
      })
    }
    if (app.globalSystemInfo) {
      let h = app.globalSystemInfo.navBarExtendHeight + app.globalSystemInfo.navBarHeight
      this.setData({
        ctHeight: h + 50
      })
    }
  },
  getColumnList(pid) {
    MallApi.fetchColumnList({pId: pid, page: 1, rows: 1000})
      .then(res => {
        console.log('column', res)
        if (res.state == 200 && res.data) {
          this.setData({
            columnList: res.data.rows
          })
        }

      })
  },
  // 列表分享 
  onShareAppMessage(e) {
    return app.utils.doShare(e, null, app)
  },
  bindfocus() {
    let _this = this
    const { rules } = this.data
    delete rules.pointsMallColumnId // 删除栏目条件
    rules.fatherAndSon = 1 // 查询子栏目返回1
    rules.page = 1
    rules.rows = 20
    wx.getStorage({
      key: 'mallName',
      success: function(res) {
        let history = res.data
        _this.setData({
          history,
          lisss: 1,
          columnList: [],
          list: [],
          ctShow: false,
          rules
        })
      },
    })
  },
  onsearchInput(e) {
    let _this = this;
    let value = e.detail.value;
    let history = _this.data.history;
    _this.setData({ //调用搜索接口
      "rules.name": value,
      list: [],
      "rules.page": 1,
      lisss: 0,
    }, () => {
      this.getList() //更新data数据
    })

    history.push({
      title: value
    })
    // 对点击后的数据做缓存,之后显示在历史记录上
    wx.setStorage({
      key: 'mallName',
      data: history,
      success(res) {
        console.log(`保存成功 `)
      }
    })
  },



  onclear() {
    let _this = this;
    wx.removeStorage({
      key: 'mallName',
      success: function (res) {

      },
    });
    _this.setData({
      history: []
    })
  },

  huanss(e) {
    var title = e.currentTarget.dataset.title;
    this.setData({ //调用搜索接口
      "rules.name": title,
      lisss: 0,
    }, () => {
      this.getList() //更新data数据
    })
  },



  getList(e) {
    wx.showLoading({
      title: '',
    })
    let list = this.data.list
    MallApi.fetchList(this.data.rules)
    .then(res => {
      let rows = res.data.rows
      if (rows.length) {
        list = list.concat(rows)
        this.setData({
          list
        })
      }
      wx.hideLoading()
    })
  },

  onReachBottom: function (e) {
    let rules = this.data.rules
    this.setData({
      "rulesl.page": ++rules.page,
    }, () => {
      this.getList()
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
  setCurrent(e) {
    const { state } = e.currentTarget.dataset
    const { tabList, rules } = this.data
    let o = tabList.find(item => item.state == state)
    if (o && o.setType) {
      rules.sortType = state
      rules.page = 1
      this.setData({
        currentTab: o.state,
        rules,
        list: []
      }, () => {
        this.getList()
      })
    } else {
      this.setData({
        ctShow: true
      })
    }
  },
  closeCT() {
    this.setData({
      ctShow: false
    })
  },
  notDo() {
    return
  },
  formInputChange(e) {
    const { field } = e.currentTarget.dataset
    this.setData({
      [`subRules.${field}`]: e.detail.value
    })
  },
  setPoints(e) {
    const { point1, point2 } = e.currentTarget.dataset
    this.setData({
      "subRules.sharePrice": point1 || '',
      "subRules.sharePrice1": point2 || ''
    })
  },
  resetForm() {
    const { subRules, oldId } = this.data
    for (const i in subRules) {
      subRules[i] = ''
    }
    if (oldId) {
      subRules.pointsMallColumnId = ''
      subRules.fatherAndSon = 1,
      subRules.pointsMallColumnId = ''
    }
    this.setData({
      subRules
    })
  },
  bindConfirm() {
    const { subRules, rules } = this.data
    let rules2 = Object.assign(rules, subRules)
    rules2.page = 1
    this.setData({
      list: [],
      rules: rules2,
      ctShow: false
    }, () => {
      this.getList()
    })
  },
  changeColumn(e) {
    const { id } = e.currentTarget.dataset
    const { subRules, rules } = this.data
    rules.fatherAndSon = 3
    subRules.pointsMallColumnId = id
    this.setData({
      subRules,
      rules
    })
  }
})