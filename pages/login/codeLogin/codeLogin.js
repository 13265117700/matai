// pages/login/codeLogin/codeLogin.js
Page({
  data: {
    smsFrom:{
      phone:'',
      code:''
    },  
    buttonName: "获取验证码",
    disabled: false
  },
  onLoad: function (options) {
    let phone = options.value;
    this.setData({
      phone
    })
  },
  inputValue:function(event){
    let code = event.detail.value;
    this.setData({
      code
    })
  },
  handCode:function(){
    if(this.data.disabled){
      return
    }
    let phone = this.data.phone;
    let source =  /^1[34578]\d{9}$/.test(phone)
    if(source){
      this.setData({
        disabled:true
      })
  
      let time = 60;
      this.setData({
        buttonName:`(${time})秒重新发送`
      })
      const interval = setInterval(() => {
        time -= 1;
        this.setData({
          buttonName:`(${time})秒重新发送`
        })
        if(time <=0){
          this.setData({
            buttonName:'秒重新发送',
            disabled:false,
          })
          clearInterval(interval)
        }
      },1000);
    }
    console.log('短信重发')
  },
  handLogin:function(){
    let phone = this.data.phone;
    let code = this.data.code;
    console.log('登录',phone,code)
  }
})