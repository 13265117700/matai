import {
  Product
} from '../../api/design/product'
const ProductApi = new Product()
const app = getApp()

Page({
  data: {
    tabs: [{
        id: 1,
        name: '关注'
      },
      {
        id: 2,
        name: '推荐',
        hide: true
      },
      {
        id: 3,
        name: '课堂',
        hide: true
      },
      {
        id: 4,
        name: '商城',
        hide: true
      },
      {
        id: 5,
        name: '活动'
      }
    ],
    currentTab: '推荐',
    Shinjitunopage: false
  },
  // 标签切换
  tabChange(e) {
    const {
      name
    } = e.target.dataset || e.currentTarget.dataset
    this.setData({
      currentTab: name
    })
  },

  onShow() {
    this.getGlobalSettings()
  },
  /**
   * 临时数据
   */
  getGlobalSettings() {
    ProductApi.getGlobalSettings()
      .then(res => {
        let { appletPaymentSwitch } = res.data
        console.log(appletPaymentSwitch)

        if(appletPaymentSwitch === 0){
          this.setData({
            currentTab:'活动',
          })
        }
        if(appletPaymentSwitch === 0){
          this.setData({
            [tabs[1].hide]:false
          })
        }

        wx.setStorageSync('app', appletPaymentSwitch)
        this.setData({
          isShow: Boolean(appletPaymentSwitch),
          Shinjitunopage: Boolean(appletPaymentSwitch)
        })
        if (!appletPaymentSwitch) {
          wx.setTabBarItem({
            index: 2,
            text: '官网'
          })
          wx.setTabBarItem({
            index: 3,
            text: '案例中心'
          })
        } else {
          wx.setTabBarItem({
            index: 2,
            text: '课堂'
          })
          wx.setTabBarItem({
            index: 3,
            text: '商城'
          })
        }
      })
  },
  scroll(e) {
    console.log(e)
  },

  // 列表分享 
  onShareAppMessage(e) {
    return app.utils.doShare(e, null, app)
  },
  goPath(e) {
    const { path } = e.currentTarget.dataset
    if (path) {
      wx.navigateTo({
        url: path
      })
    }
  },

  onReachBottom() {
    // 上拉 根据当前标签不同加载不同的数据
    let { currentTab } = this.data

    console.log('currentTab', currentTab)
    switch(currentTab) {
      case '关注': 
        this.selectComponent("#follow").onRe()
        break
      case '推荐': 
        this.selectComponent("#recommend").onRe()
        break
      case '课堂': 
        this.selectComponent("#zhishi").onRe()
        break
      case '商城': 
        this.selectComponent("#shop").onRe()
        break
      case '活动': 
        this.selectComponent("#event").onRe()
        break
    }
  }
})
