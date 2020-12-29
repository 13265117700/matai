import { HTTP } from '../../request/request'

class GetOpenid extends HTTP {
  /**
   * 获取openId 传入code
   * @param code
   */
  getOpenid(code) {
    return new Promise((resolve, reject) => {
      wx.login({
        //获取code
        success: function (res) {
          var code = res.code; //返回code
          wx.request({
            url: 'https://api.csooyun.com/wx/chat/GetOpenIdServlet' + '?js_code=' + code ,
            method: 'POST',
            header: {
              'content-type': 'json'
            },
            success:  (res) =>{
              let o = res.data.data  
              o = JSON.parse(o)
              let openid = o.openid
              resolve(openid)
            },
            fail: () => {
              reject(null)
            }
          })
        }
      })
    })

  }
}

export { GetOpenid }
