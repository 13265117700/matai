const app = getApp()

Page({
    data:{
        passwordMode: true,
    },
    bindSwitch:function(){
        let passwordMode = this.data.passwordMode = !this.data.passwordMode
        console.log(passwordMode)
        this.setData({
            passwordMode
        })
    },
    bindPhoneLogin:function(){
        console.log("手机短信登录")
    },
    bindPasswordLogin:function(){
        console.log("手机密码登录")
    },
    handWeChat:function(){
        console.log("微信登录")
    }
})