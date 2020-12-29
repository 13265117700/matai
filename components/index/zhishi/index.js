// pages/college/college.js
import {
  CollegeModel
} from '../../../api/college.js'

let collegeModel = new CollegeModel();

import {
  Product
} from '../../../api/product.js'

const coll = new Product()
Component({
  properties: {
    toShow: {
      type: Boolean,
      value: false
    }
  },
  observers: {
    toShow: function() {
      // 当show为true并且list为空的时候才去请求列表 意思是初始化时只请求一次列表
      if (this.data.toShow && !this.data.advertisingRmLbData.length) {
        collegeModel.getLatest((res) => {
          this.setData({
            collegeData: res.data.rows,
            //   currentTab : res.data.rows[0].name,
          })
        })
        collegeModel.getAdvertising((res) => {
          this.setData({
            advertisingData: res.data.rows
          })
        })
        this.setData({
          "rules.pushHome": 1,
          "rules.sortType": 4,
        }, () => {
          this.getList()
        })
      }
    }
  },
  data: {
    collegeData: [],
    currentTab: "谈谈",
    advertisingData: [],
    advertisingRmLbData: [],
    rules: {
      page: 1,
      rows: 6,
      pushHome: "",
      sortType: "",
      collegeColumnId: "",
    },
    rulesl: {
      page: 1,
      rows: 10,
      sortType: "",
      collegeColumnId: "",
    },
    tips: '请稍后',
    show: false,
    animated: true
  },
  methods: {

  //换一批
  changeBatch(e) {

    this.setData({
      "rules.page": this.data.rules.page + 1,
    }, () => {
      this.getList()
    })

    if (this.data.advertisingRmLbData.length != 6) {
      this.setData({
        "rules.page": 1,
      }, () => {
        this.getList()
      })
    }

  },


  getList(e) {
    this.setData({
      show: true
    })
    coll.getCollegeFindAll(this.data.rules)
      .then(res => {
        this.setData({
          advertisingRmLbData: res.data.rows,
          show: false
        })
      })
    coll.getCollegeFindAll(this.data.rulesl)
      .then(res => {
        this.setData({
          advertisingRmLbDatal: res.data.rows,
          show: false
        })
      })

  },

  // 标签切换
  tabChange(e) {
    //栏目切换热门
    this.setData({
      "rules.collegeColumnId": e.currentTarget.dataset.id,
      currentTab: e.currentTarget.dataset.name,

    }, () => {
      this.getList()
    })

    //栏目切换列表
    this.setData({
      "rulesl.collegeColumnId": e.currentTarget.dataset.id,
    }, () => {
      this.getList()
    })
    const {
      name
    } = e.target.dataset || e.currentTarget.dataset
    this.setData({
      currentTab: name
    })
  },


  onRe: function(e) {
    let rows = this.data.rules.rows + 10;
    this.setData({
      "rulesl.rows": rows,
    }, () => {
      this.getList()
    })
  },

  //页面跳转


  onTap: function(event) {
    let curNav = event.currentTarget.dataset.curnav;
    let curIndex = event.currentTarget.dataset.curindex;
    wx.setStorageSync("curNav", curNav);
    wx.setStorageSync("curIndex", curIndex);
    wx.navigateTo({
      url: 'classification/classification',
    })
  },

  goPath(e) {
    const {
      path
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: path
    })
  },

  goshopping_func() {
    wx.switchTab({
      url: '/pages/college/college',
    })
  },







    // 以下为旧的哦 上拉加载更多
    // onRe() {
    //   let { canDown, rules } = this.data
    //   if (canDown) {
    //     rules.page = ++ rules.page
    //     this.setData({
    //       rules
    //     }, () => {
    //       this.getList()
    //     })
    //   }
    // },
    // getList() {
    //   let { collegeList } = this.data
    //   ProductApi.fetchCollgeList(this.data.rules)
    //     .then(res => {
    //       const {
    //         rows: list
    //       } = res.data
    //       this.setData({
    //         canDown: list.length,
    //         collegeList: collegeList.concat(list)
    //       })
    //     })
    // },
    // goPath(e) {
    //   const { path } = e.currentTarget.dataset
    //   if (path) {
    //     wx.navigateTo({
    //       url: path
    //     })
    //   }
    // },
  }
})
