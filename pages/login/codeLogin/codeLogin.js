// pages/login/codeLogin/codeLogin.js
Page({
  data: {
    value:''
  },
  onLoad: function (options) {
    console.log(JSON.parse(options))
  },
  inputValue:function(event){
    let value = event.detail.value;
    this.setData({
      value
    })
  },
  handCode:function(){
    console.log('短信重发')
  },
  handLogin:function(){
    console.log('登录',this.data.value)
  }
})