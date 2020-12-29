import {
  Product
} from '../../../../api/design/product'
const ProductApi = new Product()
const app = getApp()

Page({

  data: {
    info: {},
    list: []
  },

  onLoad: function (options) {
    app.sssssssss()
    this.getInfo(options.id)
  },
  // 获取作品详情
  getInfo(id) {
    ProductApi.fetchInfo({id})
      .then(res => {
        let data = res.data
        data.details = data.details.replace(/\<img class=".*?"/g, '<img');
        data.details = data.details.replace(/\<img alt=".*?"/g, '<img');
        data.details = data.details.replace(/\<img style=".*?"/g, '<img');
        data.details = data.details.replace(/\<img/g, '<img style="max-width:100%;height:auto;display:block"');
        this.setData({
          info: data
        })
        let keyword = data.keyword.split(' ')[0]
        this.getList(keyword)
      })
  },
  // 获取相关作品
  getList(keyword) {
    let rules = {
      page: 1,
      rows: 10,
      keyword,
      classification: 2 // 1为设计 2为字体
    }
    ProductApi.fetchList(rules)
      .then(res => {
        const {
          rows: list
        } = res.data
        this.setData({
          list
        })
      })
  },
  // 详情页分享 
  onShareAppMessage(e) {
    let { name , thumbnail: cover } = this.data.info
    let info = {
      name,
      cover
    }
    return app.utils.doShare(e, info, app)
  }
})