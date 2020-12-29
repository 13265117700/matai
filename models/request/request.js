const randomString = (len) => {
  // 随机字符串
  len = len || 8;
  var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefhijklmnoprstuvwxyz1234567890'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  var maxPos = $chars.length;
  var pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

const request = (method, url, data, header) => {
  let params = { 
    'Authorization': data.Authorization,
    'deviceId': randomString(),
    'content-type':'application/x-www-form-urlencoded',
    // 'uId':data.uId
    }
  return new Promise((resolve, reject)=>{
    wx.request({
      method,
      url: url,
      header: params,
      data: { ...data },
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