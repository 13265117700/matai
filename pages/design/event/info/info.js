import {
  EventApi
} from '../../../../api/design/event'
const eventApi = new EventApi()
const app = getApp()
Page({
  data: {
    id: 0,
    info: {}
  },
  onLoad: function (options) {
    app.sssssssss()
    const {
      id
    } = options
    this.setData({
      id
    })
    this.getInfo(id)
  },
  goPath(e) {
    const {
      path
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: path
    })
  },

  getInfo(id) {
    eventApi.fetchInfo({
        id
      })
      .then(res => {
        let data = res.data
        data.content = data.content.replace(/\<img class=".*?"/g, '<img');
        data.content = data.content.replace(/\<img alt=".*?"/g, '<img');
        data.content = data.content.replace(/\<img style=".*?"/g, '<img');
        data.content = data.content.replace(/\<img/g, '<img style="max-width:100%;height:auto;display:block"');
        this.setData({
          info: data
        })
      })
  },
  onShareAppMessage(e) {
    let {
      name,
      picture: cover
    } = this.data.info
    let info = {
      name,
      cover
    }
    return app.utils.doShare(e, info, app)
  }
})