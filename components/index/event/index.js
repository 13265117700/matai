import {
  Product
} from '../../../api/design/product'
const ProductApi = new Product();

Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    }
  },
  observers: {
    show: function() {
      // 当show为true并且list为空的时候才去请求列表 意思是初始化时只请求一次列表
      if (this.data.show && !this.data.list.length) {
        this.getList()
      }
    }
  },
  data: {
    list: [], // 临时的列表
    current: 0,
    eventList: [],
    rules: {
      page: 1,
      rows: 20
    },
    canDown: 1
  },

  methods: {
    // 上拉加载更多
    onRe() {
      let { canDown, rules } = this.data
      if (canDown) {
        rules.page = ++ rules.page
        this.setData({
          rules
        }, () => {
          this.getEventList()
        })
      }
    },
    getList() {
      let rules = {
        page: 1,
        rows: 1000,
        pId: 0
      }
      ProductApi.fetchEventColumn(rules)
        .then(res => {
          const {
            rows: list
          } = res.data
          list.unshift({id: 0, name: '最新活动'})
          for (let i = 0; i < list.length; i++) {
            list[i].bg = `/images/design/index/bg${i}.png`
          }

          this.setData({
            list
          }, () => {
            this.getEventList()
          })
        })
    },
    eventTagChange(e) {
      let { index, id } = e.currentTarget.dataset
      this.setData({
        current: index,
        eventList: [],
        rules: {
          page: 1,
          rows: 20,
          canDown: 1,
          columnId: id || ''
        }
      }, () => {
        this.getEventList()
      })
    },
    getEventList() {
      wx.showLoading({
        title: '',
        icon: 'none'
      })
      let { eventList } = this.data
      ProductApi.fetchEventList(this.data.rules)
        .then(res => {
          wx.hideLoading()
          const {
            rows: list
          } = res.data
          let l = this.data.list
          for (let i = 0; i < list.length; i++) {
            let o = l.find(item => item.id == list[i].columnId)
            if(o) {
              list[i].t = o.name
            }
          }
          this.setData({
            canDown: list.length,
            eventList: eventList.concat(list)
          })
        })
    },
    goPath(e) {
      const { path } = e.currentTarget.dataset
      if (path) {
        wx.navigateTo({
          url: path
        })
      }
    },
  }
})
