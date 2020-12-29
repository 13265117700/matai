import api from '../request/api';

const upload = {
    chooseImage:function(){
        return new Promise((resolve, reject) => {
            wx.chooseImage({
                count: 1,
                sizeType:['original'],
                sourceType: ['album', 'camera'],
                success:(res) => {
                  let tempFilePaths = res.tempFilePaths[0];
                  wx.uploadFile({
                      filePath: tempFilePaths,
                      name: 'file',
                      url: api.imageUpload,
                      formData:{
                          'name':'file'
                      },
                      success:(res) => {
                          console.log(res)
                          let data = JSON.parse(res.data).name
                          resolve(data)
                      }
                  })
                },
                fail:(error) => {
                    reject(error)
                }
              })
        })
    },
    chooseVideo:function(){
        return new Promise((resolve, reject) => {
            wx.chooseVideo({
              camera: 'back',
              maxDuration: 60,
              sourceType: ['album', 'camera'],
              success:(res) => {
                let tempFilePath = res.tempFilePath;
                console.log(tempFilePath)
                wx.showLoading({ 
                    title: '上传中',
                    mask: true
                });
                wx.uploadFile({
                  filePath: tempFilePath,
                  name: 'file',
                  url: api.videoUpload,
                  formData:{
                      'name':'file'
                  },
                  success:(res) => {
                      console.log(res)
                      let data = JSON.parse(res.data).name
                      resolve(data)
                  },
                  fail:(error) => {
                      reject(error)
                  },
                  complete:() => {
                    wx.hideLoading()
                  }
                })
              }
            })
        })
    },
    uploadFile:function(filePath){
        console.log(filePath)
        return new Promise((resolve, reject) => {
            wx.uploadFile({
              filePath: filePath,
              name: 'file',
              url: api.imageUpload,
              formData:{
                'name':'file'
              },
              success:(res) => {
                let data = JSON.parse(res.data).name
                resolve(data)
              },
              fail:(error) => {
                  reject(error)
              }
            })
        })
    },
}


export default {
    upload,
}