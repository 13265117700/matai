Page({
  data: {
      name:'',
      phone:'',
      code:'',
      password:'',
      newPassword:'',
      confirmPassword:'',
      buttonName: "获取验证码",
      disabled: false,
      peIndex:''
  },
  onShow: function () {

  },
  onLoad: function (options) {
      console.log(options)
      this.setData({
          peIndex:options.index
      })
  },

  // 名字更改
  nameInput(event){
      let name = event.detail.value;
      this.setData({
          name
      })
  },

  // 密码更改
  passwordInput(event){
  let password = event.detail.value;
  this.setData({
      password
  })
  },
  newPasswordInput(event){
      let newPassword = event.detail.value;
      this.setData({
          newPassword
      })
  },
  confirmPasswordInput(event){
      let confirmPassword = event.detail.value;
      this.setData({
          confirmPassword
      })
  },

  // 手机绑定
  phoneInput(event){
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

  // 保存按钮
  handSubmit(){
      console.log(123123)
  }
})