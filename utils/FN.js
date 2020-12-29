import { config } from '../config'
const api = config.api_base_url
// 上传图片
const uploadImg = option => {
  const {count, sizeType, sourceType} = option || {}

  return new Promise(function (resolve, reject) {
    wx.chooseImage({
      count: count || 1, // 选择图片个数
      sizeType: sizeType || ['original', 'compressed'],
      sourceType: sourceType || ['album', 'camera'],
      success: function(res) { 
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: api + '/oss/file/upload',
          filePath: tempFilePaths[0], // 本项目只支持上传单图片
          name: 'file',
          formData: {
            'name': 'file'
          },
          success(res) {
            const data = JSON.parse(res.data).name
            resolve(data)
          },
          fail() {
            wx.showToast({
              title: '上传失败，请稍后重试',
              icon: 'none'
            })
          }
        })
      }
    })
  })  
}

module.exports = {
  uploadImg: uploadImg
}