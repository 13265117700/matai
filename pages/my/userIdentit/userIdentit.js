const { $Toast } = require('../../../miniprogram_npm/iview-weapp/base/index')
Page({
  data: {
    identitId:null,
    ahtcId:null,
    navbarTitle:'',
    personalForm:[{
      title:'姓名:',
      inputType:'text',
      placeholder:'请输入姓名'
    },{
      title:'联系方式:',
      inputType:'number',
      placeholder:'请输入手机号'
    },{
      title:'身份证号:',
      inputType:'idcard',
      placeholder:'请输入证件号'
    }],
    radioTitle:'提交认证',
    // disabled: false,
    checked: false,
    // 车主认证驾驶证照片
    dslImage:[{
      src:'/images/my/scc@3x.png'
    },{
      src:'/images/my/scc@3x.png'
    }]
  },
  onLoad: function (options) {
    this.setData({
      identitId:options.identitId,
      ahtcId:options.ahtcId
    })
    let identitId = this.data.identitId;
    switch(identitId){
      case '1':
        this.setData({
          navbarTitle:'申请船东认证'
        })
        break;
      case '2':
        this.setData({
          navbarTitle:'申请货主认证'
        })
        break;
      case '3':
        this.setData({
          navbarTitle:'申请车主认证'
        })
        break;
    }
    console.log(this.data.identitId)
    console.log(this.data.ahtcId)
  },
  handleAnimalChange({ detail = {} }) {
    this.setData({
        checked: detail.current
    });
    console.log(this.data.checked)
  },
  handleSubmit(){
    if(this.data.checked === false){
      $Toast({
        content: '请勾选提交认证',
        type: 'warning'
      })
      return
    }else{
      
    }
  }
})