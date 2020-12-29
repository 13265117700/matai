// pages/my/userPassword/userPassword.js
Page({
  data: {
    setUp:'',
    confirm:''
  },
  handSetup(event){
    let value = event.detail.value;
    this.setData({
      setUp:value
    })
  },
  handconfirm(event){
    let value = event.detail.value;
    this.setData({
      confirm:value
    })
  },
  handAdd(){
    let setUp = this.data.setUp;
    let confirm = this.data.confirm;
    console.log(setUp,confirm)
  }
})