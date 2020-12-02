// pages/my/userIdentit/userIdentit.js
Page({
  data: {
    identitId:null,
    ahtcId:null,
    personalForm:[{
      title:'姓名',
      inputType:'text',
      placeholder:'请输入姓名'
    },{
      title:'联系方式',
      inputType:'number',
      placeholder:'请输入手机号'
    },{
      title:'身份证号',
      inputType:'idcard',
      placeholder:'请输入证件号'
    }],
    imgJust:[{url:''}],
    imgThe:[{url:''}]
  },
  onLoad: function (options) {
    this.setData({
      identitId:options.identitId,
      ahtcId:options.ahtcId
    })
    console.log(this.data.identitId)
    console.log(this.data.ahtcId)
  }
})