Page({
  data: {
    setUpList:[{
      title:'头像',
      text:'请设置头像',
      avatar:'https://activity.vtuzx.com/doc/vtuUI/weapp/avatar/1.png',
      id:'1111112'
    },{
      title:'昵称',
      text:'请输入用户名称',
      id:'112124'
    },{
      title:'手机绑定',
      text:'请绑定手机号',
      id:'1745236'
    },{
      title:'登录密码',
      text:'请设置登录密码',
      id:'2288553'
    }],
    show: false,
    popupButton:[{
      text:'拍照'
    },{
      text:'从手机相册选取'
    },{
      text:'取消'
    }]
  },
  handSetUp(event){
    let dataset = event.currentTarget.dataset;
    let index = dataset.index;
    if(index === 0){
      this.setData({ show: true });
    }else{
      wx.navigateTo({
          url: '/views/UserSettingsItem/UserSettingsItem?index=' + index,
      })
    }
  //   switch(index){
  //     case 0:
  //       this.setData({ show: true });
  //       break
  //     case 1:
  //       wx.navigateTo({
  //         url: '/pages/my/userSetUp/userName/userName',
  //       })
  //       break
  //     case 2:
  //       wx.navigateTo({
  //         url: '/pages/my/userSetUp/userPhone/userPhone',
  //       })
  //       break
  //     case 3:
  //       wx.navigateTo({
  //         url: '/pages/my/userSetUp/userPassword/userPassword',
  //       })
  //       break
  //   }
    console.log('点开设置功能')
  },
  handPopup(event){
    let dataset = event.currentTarget.dataset;
    let index = dataset.index;
    switch(index){
      case 0:
        console.log('摄像')
        break
      case 1:
        console.log('从手机相册选取')
        break
      case 2:
        this.setData({ show: false });
        break
    }
  }
})