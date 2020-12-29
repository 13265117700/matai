// pages/my/userPhone/userPhone.js
Page({
  data: {
    phone:'',
    code:'',
    buttonName: "获取验证码",
    disabled: false
  },
  handphone(event){
    let phone = event.detail.value;
    this.setData({
      phone
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
  codeInput(event){
    let code = event.detail.value;
    this.setData({
      code
    })
  },
  handAdd(){
    let phone = this.data.phone;
    let code = this.data.code;
    console.log(phone,code)
  }
})