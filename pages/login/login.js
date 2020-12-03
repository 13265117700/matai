const app = getApp()
import UserLogin from '../../models/login/login'

Page({
    data:{
        passwordMode: true,
        phone:'',
        password:''
    },
    bindSwitch:function(){
        let passwordMode = this.data.passwordMode = !this.data.passwordMode
        this.setData({
            passwordMode
        })
    },
    phoneInput:function(event){
        let phone = event.detail.value;
        this.setData({
            phone
        })
    },
    passwordInput:function(event){
        let password = event.detail.value;
        this.setData({
            password
        })
    },
    submitForm:function(){
        console.log("手机密码登录")
        console.log(this.data.phone,this.data.password)
    },
    handleSendCode:function(){
        console.log("获取短信")
        console.log(this.data.phone)
        let phone = this.data.phone;
        wx.navigateTo({
          url: '/pages/login/codeLogin/codeLogin?value=' + phone,
        })
    },
    weChatLogin:function(){
        wx.getSetting({
          success(res){
              if(res.authSetting['scope.userInfo']){
                  wx.login({
                    success(res){
                        console.log(res)
                        UserLogin.weChatLogin({code:res.code}).then(data => {
                            console.log(data)
                        })
                    }
                  })
              }
          }
        })
        
    }
})