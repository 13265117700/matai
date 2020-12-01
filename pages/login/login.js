const app = getApp()

Page({
    data:{
        passwordMode: true,
        phone:null,
        password:null,
        code:null,
        // show: false,
        // passwordFrom: {
        //     phone: "",
        //     password: ""
        // },
        // smsFrom: {
        //     phone: "",
        //     code: ""
        // },
        buttonName: "获取验证码",
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
    handWeChat:function(){
        console.log("微信登录")
    }
    // showPopup() {
    //     this.setData({ show: true });
    // }
})