const request = (method, url, data, header) => {
    let token = wx.getStorageSync('token')
    let id = wx.getStorageSync('id')
    let params = { token, id }
    return new Promise((resolve, reject)=>{
      wx.request({
        method,
        url: url,
        header: params,
        data: data,
        success: (res) => {
          resolve(res)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }
  
  export default {
    post: function (url='', data, header={}) {
      return request('POST', url, data, header)
    },
    put: function (url='', data, header={}) {
      return request('PUT', url, data, header)
    },
    get: function (url, data, header={}) {
      return request('GET', url, data, header)
    },
    delete: function (url='', data, header={}) {
      return request('DELETE', url,header)
    }
  }