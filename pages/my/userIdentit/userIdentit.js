const { $Toast } = require('../../../miniprogram_npm/iview-weapp/base/index')
Page({
  data: {
    identitId:null,
    ahtcId:null,
    navbarTitle:'',
    radioTitle:'提交认证',
    // disabled: false,
    checked: false,
    // 车主认证驾驶证照片
    dslImage:[{
      src:'/images/my/scc@3x.png'
    },{
      src:'/images/my/scc@3x.png'
    }],

    ctsInput:'',// 统一社会信用代码input
    cpInput:'',//企业名称input
    nameInput:'',//姓名input
    phoneInput:'',//联系方式input
    idenIput:'',//身份证input
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
  // 统一社会信用代码input
  handCtsInput(e){
    let ctsInput = e.detail.value;
    this.setData({
      ctsInput
    })
  },
  //企业名称input
  handCpInput(e){
    let cpInput = e.detail.value;
    this.setData({
      cpInput
    })
  },
  // 姓名input
  handNameInput(e){
    let nameInput = e.detail.value;
    this.setData({
      nameInput
    })
  },
  //联系方式input
  handPhoneInput(e){
    let phoneInput = e.detail.value;
    this.setData({
      phoneInput
    })
  },
  //身份证input
  handIdenInput(e){
    let idenIput = e.detail.value;
    this.setData({
      idenIput
    })
  },
  handleSubmit(){
    let identitId = this.data.identitId;
    let ahtcId = this.data.ahtcId;
    // let ctsInput = this.data.ctsInput;
    // let cpInput = this.data.cpInput;
    // let nameInput = this.data.nameInput;
    // let phoneInput = this.data.phoneInput;
    // let idenIput = this.data.idenIput;
    if(this.data.checked === false){
      $Toast({
        content: '请勾选提交认证',
        type: 'warning'
      })
      return
    }else{
      if(identitId === '1' && ahtcId === 'a1a2a3'){
        this.IndividAuth(identitId,ahtcId)
      }else if(identitId === '1' && ahtcId === 'b1b2b3'){
        this.EnterpAuth(identitId,ahtcId)
      }else if(identitId === '2' && ahtcId === 'a1a2a3'){
        this.IndividAuth(identitId,ahtcId)
      }else if(identitId === '2' && ahtcId === 'b1b2b3'){
        this.EnterpAuth(identitId,ahtcId)
      }else if(identitId === '3' && ahtcId === 'a1a2a3'){
        this.IndividAuth(identitId,ahtcId)
      }else{
        this.EnterpAuth(identitId,ahtcId)
      }
    }
  },
  //个人认证
  IndividAuth(identitId,ahtcId){
    let nameInput = this.data.nameInput;
    let phoneInput = this.data.phoneInput;
    let idenIput = this.data.idenIput;
    console.log(identitId,ahtcId,nameInput,phoneInput,idenIput)
  },
  // 企业认证
  EnterpAuth(identitId,ahtcId){
    let ctsInput = this.data.ctsInput;
    let cpInput = this.data.cpInput;
    let nameInput = this.data.nameInput;
    let phoneInput = this.data.phoneInput;
    let idenIput = this.data.idenIput;
    console.log(identitId,ahtcId,nameInput,phoneInput,idenIput,ctsInput,cpInput)
  },
})