// pages/my/userName/userName.js
Page({
  data: {
    value:''
  },
  handName(event){
    let value = event.detail.value;
    this.setData({
      value
    })
  },
  handAdd(){
    console.log(this.data.value)
  }
})