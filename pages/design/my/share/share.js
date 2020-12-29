import {
  ADPicture
} from '../../../../api/design/find'
import {
  EWM
} from '../../../../api/design/ewm'
const AdApi = new ADPicture()
const EWMApi = new EWM()
let app = getApp()

//注册页面 http://csyimg.oss-cn-shenzhen.aliyuncs.com/images/2020/07/16/15948685286176292.jpg
Page({
  data: {
    bg: "http://csyimg.oss-cn-shenzhen.aliyuncs.com/images/2020/07/16/15948685286176292.jpg",
    faceImage: 'http://csyimg.oss-cn-shenzhen.aliyuncs.com/images/2020/05/07/1588846233347531.png',
    ewm: '',
    myCanvasWidth: 750, // canvas宽度
    myCanvasHeight: 1334, // canvas高度
    wWidth: 750, // 显示的容器高
    wHeight: 2000, // 显示的容器宽
    wBg: '', // ios 不支付临时路径
    canWrite: true,
    bgList: [],
    currentIndex: 0,
    faceImage2: ''
  },

  onLoad: function () {
    wx.showLoading({
      title: '正在生成二维码',
      icon: 'none',
      mask: true
    })
    let userInfo = app.g.userInfo
    if (!userInfo) {
      app.asyncUserInfo = res => {
        this.setData({
          userInfo: res,
          nickName: res.nickName,
          faceImage: res.faceImage,
          faceImage2: userInfo.faceImage
        }, () => {
          this.getEMW()
        })
      }
    } else {
      this.setData({
        userInfo: userInfo,
        nickName: userInfo.nickName,
        faceImage: userInfo.faceImage,
        faceImage2: userInfo.faceImage
      }, () => {
        this.getEMW()
      })
    }
  },
  onShow() {
    this.getSetting()
  },

  getSetting() {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.writePhotosAlbum'] === false) {
          this.setData({
            canWrite: false
          })
        } else {
          this.setData({
            canWrite: true
          })
        }
      }
    })
  },

  /**
   * 获取二维码
   */

  getEMW() {
    let { userInfo } = this.data
    EWMApi.getEWM(userInfo.popularizeId)
      .then(async res => {
        if (res.status == 200) {
          let img =  res.data
          let ewm = await app.utils.downloadImg(img)
          this.setData({
            ewm
          })
          this.getBgList()
        } else {
          this.getEMW()
        }
      })
  },

  /**
   * 1.
   * 获取背景图列表
   */
  async getBgList() {
    let rules = {
      page: 1,
      rows: 20,
      advertisingColumnId: 7
    }
    let { data: { rows } } = await AdApi.fetchList(rules)
    // 设置第一张图为默认BG
    let firstImage = rows[0].advertisingPicture
    let bg = await app.utils.downloadImg(firstImage)
    let faceImage = await app.utils.downloadImg(this.data.faceImage)

    /**
     * 获取背景图的高度
     * 根据比例设置canvas的高度，这里默认设置canvas的宽度为750
     */
    wx.getImageInfo({
      src: bg,
      success: res => {
        const { height, width } = res
        let ratio = width / 750 // canvas容器的
        let wRatio = 540 / 750 // 这里是显示容器的比例 本项目里宽为 540

        this.setData({
          bgList: rows,
          myCanvasWidth: 750,
          myCanvasHeight: height * ratio,
          wWidth: 750 * wRatio,
          wHeight: height * wRatio,
          bg,
          wBg: firstImage,
          faceImage
        }, () => {
          this.setPackInfo()
        })
      }
    })
  },

  /**
   * 换一张
   */
  async changeBg() {
    wx.showLoading({
      title: '正在生成二维码',
      icon: 'none'
    })
    let { bgList, currentIndex } = this.data
    let l = bgList.length
    currentIndex = ++currentIndex
    if (currentIndex == l) {
      currentIndex = 0
    }
    let o = bgList[currentIndex]
    let firstImage = o.advertisingPicture
    let bg = await app.utils.downloadImg(firstImage)

    wx.getImageInfo({
      src: bg,
      success: res => {
        const { height, width } = res
        let ratio = width / 750 // canvas容器的
        let wRatio = 540 / 750 // 这里是显示容器的比例 本项目里宽为 540

        this.setData({
          currentIndex,
          myCanvasWidth: 750,
          myCanvasHeight: height * ratio,
          wWidth: 750 * wRatio,
          wHeight: height * wRatio,
          bg,
          wBg: firstImage,
        }, () => {
          this.setPackInfo()
        })
      }
    })

  },

  /**
   * 2. 
   * 设置canvas 需要的参数
   * bg, faceImage, nickName, ewm
   */
  setPackInfo() {
    let { bg, ewm, faceImage, nickName } = this.data
    let options = {
      bg: '',
      ewm: '',
      faceImage: faceImage,
      nickName: nickName
    }

    options.bg = bg
    options.ewm = ewm // 暂时没有网络的二维码
    options.faceImage = faceImage

    // wx.hideLoading()
    this.packImage2(options)
  },

  /**
   * 3.
   * 合成海报
   */
  packImage2(options) {
    let { bg, faceImage, ewm, nickName } = options
    /**
     * 需要传入 bg, faceImage, nickName, ewm
     * 图片处理 微信小程序里需要 将网络图片转成本地临时路径 不转的话, 在手机上是不会显示的
     */
    let { myCanvasWidth, myCanvasHeight } = this.data

    /**
     * 开始绘制
     */
    let context = wx.createCanvasContext('canvas2');
    context.fillStyle = "#FFFFFF";

    /**
     * 绘制背景图
     */
    context.fillRect(0, 0, myCanvasWidth, myCanvasHeight); //设置canvas画布的宽与高
    context.drawImage(bg, 0, 0, myCanvasWidth, myCanvasHeight); //绘制   背景图

    /**
     * 绘制底部白色矩形 这里设置为底部280px
     */
    let offsetBottom = myCanvasHeight - 220
    context.fillStyle = "#ffffff";
    context.fillRect(0, offsetBottom, myCanvasWidth, myCanvasHeight);

    /**
     * 绘制头像 这里是宽高都为98的圆 半径为 49
     * 头像距离矩形顶部为38px 左侧为33px
     * 则圆心距离canvas顶部为 offsetBottom + 38 + 49
     */

    context.save();
    context.beginPath();
    context.arc(82, offsetBottom + 67, 45, 0, Math.PI * 2); // x, y, 半径 ... 
    context.clip(); //剪切路径
    context.drawImage(faceImage, 33, offsetBottom + 18, 98, 98) // 头像
    context.restore();

    /**
     * 绘制二维码 宽 高皆为231
     * 距离矩形顶部25px canvas容器右侧30px
     */
    context.drawImage(ewm, myCanvasWidth - 160 - 20, offsetBottom + 24, 160, 160);

    /**
     *  绘制文字
     */
    context.font = "normal 26px Heiti SC";
    // 设置颜色
    context.fillStyle = "#191919";
    // 设置水平对齐方式
    context.textAlign = "left";
    // 设置垂直对齐方式
    context.textBaseline = "middle";
    // 绘制文字（参数：要写的字，x坐标，y坐标）
    context.fillText("图可图 - 探索创意灵感、设计素材", 33, offsetBottom + 140);
    context.fillText("自我学习成长的创意智慧服务平台", 33, offsetBottom + 176);
    // 昵称
    context.font = "normal 40px bold Heiti SC";
    context.fillStyle = '#069fbb'
    let textH = offsetBottom + 72
    context.fillText(nickName, 150, textH);

    /**
     * 结束绘制
     */
    wx.hideLoading()
    context.draw();
  },

  /**
   * 保存图片
   */
  clickMe: function () {
    let _this = this
    wx.canvasToTempFilePath({
      canvasId: 'canvas2',
      fileType: 'jpg',
      quality: 1,
      success: function (res) {
        let path = res.tempFilePath;
        wx.saveImageToPhotosAlbum({
          filePath: path,
          success(res) {
            wx.showToast({
              title: '图片保存成功',
              icon: 'none'
            });
          },
          fail: () => {
            _this.getSetting()
          }
        })
        console.log('path', path)
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  /**
   * 预览当前海报
   * 长按分享
   */
  previewImage() {
    wx.canvasToTempFilePath({
      canvasId: 'canvas2', // 需要2倍图改为 canvas2
      fileType: 'jpg',
      quality: 1,
      success: function (res) {
        let path = res.tempFilePath;
        wx.previewImage({
          current: path, // 当前显示图片的http链接
          urls: [path] // 需要预览的图片http链接列表
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  }
})