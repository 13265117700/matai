Component({
  properties: {

  },
  data: {
    bottomBars: [{
        id: 1,
        path: '/pages/index/index',
        name: '首页',
        active: true,
        icon1: '/images/icon/bottombar/sy2@2x.png',
        icon2: '/images/icon/bottombar/shouye1@2x.png'
      },
      {
        id: 2,
        path: '/pages/design/find/find',
        name: '发现',
        active: false,
        icon1: '/images/icon/bottombar/fx2@2x.png',
        icon2: '/images/icon/bottombar/faxian1@2x.png'
      },
      {
        id: 3,
        path: '',
        name: '',
        active: false,
        icon1: '/images/icon/bottombar/tjzp@2x.png',
        icon2: '/images/icon/bottombar/tjzp@2x.png'
      },
      {
        id: 4,
        path: '/pages/college/college',
        name: '知识',
        active: false,
        icon1: '/images/icon/bottombar/zs2@2x.png',
        icon2: '/images/icon/bottombar/zs1@2x.png'
      },
      {
        id: 5,
        path: '/pages/design/my/my',
        name: '我的',
        active: false,
        icon1: '/images/icon/bottombar/wd2@2x.png',
        icon2: '/images/icon/bottombar/wd1@2x.png'
      }
    ],
    path: ''
  },
  lifetimes: {
    attached: function () {
      let pages = getCurrentPages() //获取加载的页面
      let currentPage = pages[pages.length - 1] //获取当前页面的对象
      let path = '/' + currentPage.route
      let list = this.data.bottomBars
      for (let i = 0; i < list.length; i++) {
        if (list[i].path === path) {
          list[i].active = true
        } else {
          list[i].active = false
        }
      }
      this.setData({
        bottomBars: list,
        path
      })
    }
  },
  methods: {
    // 以下为底部栏的 bottomBarTap
    bottomBarTap(e) {
      const {
        path
      } = e.currentTarget.dataset

      if (path.indexOf(this.data.path) > -1) {
        return console.log('当前页')
      }
      if (path) {
        wx.redirectTo({
          url: path
        })
      }
    }
  }
})