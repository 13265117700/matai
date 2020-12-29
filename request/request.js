import { config } from '../config.js'

class HTTP {
  // 请求不需要token的数据
  req({method = 'GET', url, data = {} }) {
    method = method.toUpperCase()
    if (method === 'POST') {
      return new Promise((resolve, reject) => {
        try {
          wx.request({
            url: `${config.api_base_url}${url}`,
            method: method,
            data: data,
            header: {
              Authorization: 'Basic Y3M6Y3Nvbw==',
              'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            success: (res) => {
              let code = res.statusCode.toString()
              if (code.startsWith('2')) {
                resolve(res.data)
              } else {
                let error_code = res.data.error_code
                reject(error_code)
              }
            },
            fail: (err) => {
              reject('err', err)
            }
          })
        } catch { 
          reject('err')
        }
      })
    }
    return new Promise((resolve, reject) => {
      try {
        wx.request({
          url: `${config.api_base_url}${url}`,
          method: method,
          data: data,
          success: (res) => {
            let code = res.statusCode.toString()
            if (code.startsWith('2')) {
              resolve(res.data)
            } else {
              let error_code = res.data.error_code
              reject(error_code)
            }
          },
          fail: (err) => {
            reject('err', err)
          }
        })
      } catch {
        reject('err')
      }
    })
  }
  // 需要带token的
  reqWithToken({ method = 'GET', url, data = {}}) {
    const tokens = wx.getStorageSync('tokens')
    const token = tokens.access_token
    return new Promise((resolve, reject) => {
      try {
        wx.request({
          url: `${config.api_base_url}${url}`,
          method: method,
          data: data,
          header: {
            'Authorization': 'bearer ' + token,
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: (res) => {
            let code = res.statusCode.toString()
            if (code.startsWith('2')) {
              resolve(res.data)
            } else {
              let error_code = res.data.error_code
              reject(error_code)
            }
          },
          fail: (err) => {
            reject('err', err)
          }
        })
      } catch {
        reject('err')
      }
    })
  }
}

export {
  HTTP
}