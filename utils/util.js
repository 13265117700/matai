const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':') // 2000/01/01 00:00:00
  return [year, month, day].map(formatNumber).join('-')
}


const formatTimeAll = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()
  const minute = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
  const second = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()

  // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':') // 2000/01/01 00:00:00
  let str = [year, month, day].map(formatNumber).join('-') + ` ${hour}:${minute}:${second}`
  return str
}

// 倒计时
const GetRTime = (end_time) => {
  // var EndTime= new Date('2017/05/20 13:14:00'); 
   var EndTime= new Date(end_time); 
   var NowTime = new Date();
   var t =EndTime.getTime() - NowTime.getTime();

   var d=Math.floor(t/1000/60/60/24);
   var h=Math.floor(t/1000/60/60%24);
   var m=Math.floor(t/1000/60%60);
   var s=Math.floor(t/1000%60);
   if(s >= 0) {
     h = h > 9 ? h : '0' + h
     m = m > 9 ? m : '0' + m
     s = s > 9 ? s : '0' + s
     return  h + ':' + m + ':' +s;
   }
}

const getDateDiff = (dateTimeStamp) => {
  if (typeof dateTimeStamp == 'string' && dateTimeStamp.length > 19) {
    let c = dateTimeStamp
    c = c.slice(0, 10) + ' ' + c.slice(11, 19)
  }
  dateTimeStamp = new Date(dateTimeStamp.replace(/-/g, '/')).getTime()

  let result = ''
  let minute = 1000 * 60;
  let hour = minute * 60;
  let day = hour * 24;
  let halfamonth = day * 15;
  let month = day * 30;
  let now = new Date().getTime();
  let diffValue = now - dateTimeStamp;
  if (diffValue < 0) {
    return;
  }

  let monthC = diffValue / month;
  let weekC = diffValue / (7 * day);
  let dayC = diffValue / day;
  let hourC = diffValue / hour;
  let minC = diffValue / minute;

  if (monthC >= 1) {
    result = parseInt(monthC) + "月前";
  } else if (weekC >= 1) {
    result = parseInt(weekC) + "周前";
  } else if (dayC >= 1) {
    result = parseInt(dayC) + "天前";
  } else if (hourC >= 1) {
    result = parseInt(hourC) + "小时前";
  } else if (minC >= 1) {
    result = parseInt(minC) + "分钟前";
  } else {
    result = "刚刚";
  }
  return result;
}

const setPrice = (price) => {
  // 传入一个金额返回一个第2位小数进1的价格
  price = Math.ceil(Math.ceil(price * 1000) / 10) / 100
  return Number(price.toFixed(2))
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const randomString = (len) => {
  // 随机字符串
  len = len || 8;
  var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefhijklmnoprstuvwxyz1234567890'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  var maxPos = $chars.length;
  var pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

const unique1 = (arr) => {
  // 数组去重
  var hash = [];
  for (var i = 0; i < arr.length; i++) {
    if (hash.indexOf(arr[i]) == -1) {
      hash.push(arr[i]);
    }
  }
  return hash;
}

const encodePhone = (phone) => {
  // 手机号码加 ****
  phone = phone.toString()
  let n = ''
  n += phone.slice(0, 3)
  n += '****'
  n += phone.slice(7)

  return n;
}

// 详细地址去混淆 返回全部
const deConfusionAll = (str) => {
  let tempStr = ''
  let index = str.indexOf('angkor-|||')
  if (index == -1) {
    return str
  }
  tempStr += str.slice(0, index)
  tempStr += str.slice(index + 10)
  return tempStr
}
// 详细地址去混淆 但是只保留最后一段
const deConfusion = (str) => {
  let tempStr = ''
  let index = str.indexOf('angkor-|||')
  if (index == -1) {
    return str
  }
  // tempStr += str.slice(0, index) // 这里是前段, 不需要
  tempStr += str.slice(index + 10)
  return tempStr
}

// 设置显示自动关闭订单时间
const getOverTime = (date) => {
  // date: 2019-12-25 18:10:00
  // 剩余23小时59分自动关闭 getOverTime('2019-12-25 18:15:00')

  let str = ''
  let d = new Date().getTime()
  let creTime = new Date(date).getTime()
  let min30 = 30 * 60 * 1000

  let mainasu = d - creTime

  if (mainasu > min30) {
    str = '已关闭'
  } else {
    let time = 30 - ~~(mainasu / 60 / 1000)
    str = `剩余${time}分自动关闭订单`
  }
  return str
}
// 个人中心 发布状态
const setStatus = (status) => {
  
  let str = ''
  switch(status) {
    case 1: 
      str = '审核中'
      break
    case 2: 
      str = '发布中'
      break
    case 3: 
      str = '审核不通过'
      break
    case 4: 
      str = '已删除'
      break
    default:
      str = '发布中'
  }

  return str
}
// 个人中心 发布回复状态
const setStatus2 = (status) => {
  let str = ''
  switch(status) {
    case 1: 
      str = '发布中'
      break
    case 2: 
      str = '系统关闭'
      break
    case 3: 
      str = '用户删除'
      break
    default:
      str = '发布中'
  }

  return str
}

// 微信小程序分享
function doShare(e, info, app) {
  /**
   * e 事件对象, 必传, 如果是点击按钮分享的, 需要在按钮上设置3个dataset: title, path, cover
   * info 可选 详情页点击右上角...分享的时候为了样式好看, info格式: { name: '标题', cover: '要显示的图片' }
   * app 可选 获取用户信息绑定下线等
   */
  let title = '' // 标题
  let path = ''  // 分享路径
  let imageUrl = '' // 图片
  let { from, target } = e

  // 如果不是从分享按钮分享出来的, 要根据情况改变图片和标题字段
  if (from !== 'button') {
    /**
     * 获取页面 完全路径  带查询参数
     */
    let pages = getCurrentPages() //获取加载的页面
    let currentPage = pages[pages.length-1] //获取当前页面的对象
    let url = currentPage.route //当前页面url
    let options = currentPage.options //如果要获取url中所带的参数可以查看options
    
    //拼接url的参数
    let urlWithArgs = url + '?'
    for(let key in options){
        let value = options[key]
        urlWithArgs += key + '=' + value + '&'
    }
    urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length-1)
    path = '/' + urlWithArgs

    // 有果有传info参数时
    if (info) {
      imageUrl = info.cover
      title = info.name
    }
  } else {
    let { dataset } = target
    path = dataset.path
    imageUrl = dataset.cover || ''
    title = dataset.title || '我给你分享了一个页面，图可图'
  }
  
  /*
    * 以下这个if为额外的，根据自己业务需求与实际代码进行修改，删除也没关系
    * 我这项目是有分销的，当客户分享页面给别人时，需要进行绑定下属关系
  */
  
  if (app) {
    if (path.indexOf('?') > -1 && app.g.userInfo) {
      path = path + '&share=' + app.g.userInfo.popularizeId
    } else if (app.g.userInfo) {
      // 已登录
      path = path + '?share=' + app.g.userInfo.popularizeId
    } else {
      path = path
    }
  }
  console.log('分享的路径为：', path)
  return {
    title,
    path,
    imageUrl
  }
}

function downloadImg(url) {
  if (url.indexOf('https') === -1) {
    url = url.replace('http', 'https')
  }
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      url,
      success: res => {
        if (res.statusCode === 200) {
          resolve(res.tempFilePath)
        } else {
          resolve('')
        }
      },
      fail: () => {
        reject('')
      }
    })
  })
}

module.exports = {
  formatTime: formatTime,
  formatTimeAll: formatTimeAll,
  getDateDiff: getDateDiff,
  randomString: randomString,
  unique1: unique1,
  encodePhone: encodePhone,
  deConfusionAll: deConfusionAll,
  deConfusion: deConfusion,
  getOverTime: getOverTime,
  setPrice: setPrice,
  setStatus2,
  setStatus,
  doShare,
  downloadImg,
  GetRTime
}