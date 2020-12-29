const { $Toast } = require('../../miniprogram_npm/iview-weapp/base/index');
import upload from '../../models/upload/upload';
import User from '../../models/user/user';
import user from '../../models/user/user';

Page({
  data: {
    navbarTitle:'',
    radioTitle:'提交认证',
    // disabled: false,
    checked: false,

    // 未上传驾驶证默认照片
    dslImage:[{
      src:'/images/my/scc@3x.png'
    },{
      src:'/images/my/scc@3x.png'
    }],
    idenID:null,//认证身份ID
    identity:null,//认证方式ID
    creditCode:'',// 统一社会信用代码
    nameEnterprise:'',//企业名称
    contacts:'',//联系人
    phone:'',//联系方式
    idNumber:'',//身份证号
    corporateId:'',//身份证正面
    backViewIdCard:'',//身份证反面
    businessLicense:'',//营业执照
    licensePlate:'',//车牌号
    driveJust:'',//驾驶证正面
    driveBack:'',//驾驶证反面
    transportPermit:'',//道路许可证照片
  },
  onLoad: function (options) {
    this.setData({
      idenID:options.idenID,
      identity:options.identity
    })
    let idenID = this.data.idenID;
    switch(idenID){
      case '153':
        this.setData({
          navbarTitle:'申请船东认证'
        })
        break;
      case '151':
        this.setData({
          navbarTitle:'申请货主认证'
        })
        break;
      case '152':
        this.setData({
          navbarTitle:'申请车主认证'
        })
        break;
    }
    console.log(this.data.idenID,'认证身份')
    console.log(this.data.identity,'认证方式')
  },
  handleAnimalChange({ detail = {} }) {
    this.setData({
        checked: detail.current
    });
    console.log(this.data.checked)
  },
  // 统一社会信用代码input
  handcreditCode(e){
    let creditCode = e.detail.value;
    this.setData({
      creditCode
    })
  },
  //企业名称input
  handnameEnterprise(e){
    let nameEnterprise = e.detail.value;
    this.setData({
      nameEnterprise
    })
  },
  // 姓名input
  handContacts(e){
    let contacts = e.detail.value;
    console.log(contacts,12323)
    this.setData({
      contacts
    })
  },
  //联系方式input
  handPhone(e){
    let phone = e.detail.value;
    this.setData({
      phone
    })
  },
  //身份证input
  handIdenInput(e){
    let idNumber = e.detail.value;
    this.setData({
      idNumber
    })
  },

   //身份证正面照片上传
   IdJustUpload(){
    upload.upload.chooseImage().then(file => {
      console.log(file)
      this.setData({
        corporateId:file
      })
    })
  },
  //身份证反面照片上传
  IdBackUpload(){
    upload.upload.chooseImage().then(file => {
      console.log(file)
      this.setData({
        backViewIdCard:file
      })
    })
  },
  //营业执照上传
  businessLicenseUpload(){
    upload.upload.chooseImage().then(file => {
      this.setData({
        businessLicense:file
      })
    })
  },


  //提交按钮
  handleSubmit(){
    let idenID = this.data.idenID;
    console.log(idenID)
    console.log(this.data.identity)
    if(this.data.checked === false){
      $Toast({
        content: '请勾选提交认证',
        type: 'warning'
      })
      return
    }
    
    //船东
    if(idenID === '153'){
      this.mtShipownerUpdate(idenID)
    }
    // 货主
    if(idenID === '151'){
      this.mtCargoOwnerUpdate(idenID)
    }
    //车主
    if(idenID === '152'){
      this.mtOwnerUpdate(idenID)
    }
  },

  //船东
  mtShipownerUpdate(idenID){
    console.log('船东',this.data.identity)
    let Authorization = wx.getStorageSync('Authorization')
    let identity = this.data.identity;//身份（0个人,1企业）
    let creditCode = this.data.creditCode;//统一信用代码
    let nameEnterprise = this.data.nameEnterprise;//企业名称
    let contacts = this.data.contacts;//联系人
    let phone = this.data.phone;//联系电话
    let idNumber = this.data.idNumber;//身份证号码
    let corporateId = this.data.corporateId;//身份证正面
    let backViewIdCard = this.data.backViewIdCard;//身份证反面
    let businessLicense = this.data.businessLicense;//营业执照
    if(this.data.identity === '0'){
      console.log('个人')
      let personalParams = {
        Authorization,
        identity,
        contacts,
        phone,
        idNumber,
        corporateId,
        backViewIdCard
      }

      if(!contacts || !phone || !idNumber || !corporateId || !backViewIdCard){
        return $Toast({ content: '带红*号的都是必填项目',type: 'warning' })
      }else{
        user.mtShipownerUpdate(personalParams).then(res => {
          console.log(res)
          if(res.statusCode === 200){
            $Toast({content: '提交成功',type: 'success'})
            wx.navigateTo({
              url: '/views/UserAuthenticationInfo/UserAuthenticationInfo?idenID=' + idenID,
            })
          }
        })
      }
    } else {
      console.log('企业')
      let personalParams = {
        Authorization,
        identity,
        creditCode,
        nameEnterprise,
        contacts,phone,
        idNumber,
        corporateId,
        backViewIdCard,
        businessLicense
      }
      if(!creditCode || !contacts || !phone || !idNumber || !corporateId || !backViewIdCard || !businessLicense){
          return $Toast({ content: '带红*号的都是必填项目',type: 'warning' })
      }else{
        User.mtShipownerUpdate(personalParams).then(res => {
          if(res.statusCode === 200){
            $Toast({content: '提交成功',type: 'success'})
            wx.navigateTo({
              url: '/views/UserAuthenticationInfo/UserAuthenticationInfo?idenID=' + idenID,
            })
          }
        })
      }
    }
  },

  //货主
  mtCargoOwnerUpdate(idenID){
    console.log('货主')
    let Authorization = wx.getStorageSync('Authorization')
    let identity = this.data.identity;//身份（0个人,1企业）
    let creditCode = this.data.creditCode;//统一信用代码
    let nameEnterprise = this.data.nameEnterprise;//企业名称
    let contacts = this.data.contacts;//联系人
    let phone = this.data.phone;//联系电话
    let idNumber = this.data.idNumber;//身份证号码
    let corporateId = this.data.corporateId;//身份证正面
    let backViewIdCard = this.data.backViewIdCard;//身份证反面
    let businessLicense = this.data.businessLicense;//营业执照
    if(this.data.identity === '0'){
      console.log('个人')
      let personalParams = {
        Authorization,
        identity,
        contacts,
        phone,
        idNumber,
        corporateId,
        backViewIdCard
      }

      if(!contacts || !phone || !idNumber || !corporateId || !backViewIdCard){
        return $Toast({ content: '带红*号的都是必填项目',type: 'warning' })
      }else{
        user.mtCargoOwnerUpdate(personalParams).then(res => {
          console.log(res)
          if(res.statusCode === 200){
            $Toast({content: '提交成功',type: 'success'})
            wx.navigateTo({
              url: '/views/UserAuthenticationInfo/UserAuthenticationInfo?idenID=' + idenID,
            })
          }
        })
      }
    } else {
      console.log('企业')
      let personalParams = {
        Authorization,
        identity,
        creditCode,
        nameEnterprise,
        contacts,phone,
        idNumber,
        corporateId,
        backViewIdCard,
        businessLicense
      }
      if(!creditCode || !contacts || !phone || !idNumber || !corporateId || !backViewIdCard || !businessLicense){
          return $Toast({ content: '带红*号的都是必填项目',type: 'warning' })
      }else{
        User.mtCargoOwnerUpdate(personalParams).then(res => {
          if(res.statusCode === 200){
            $Toast({content: '提交成功',type: 'success'})
            wx.navigateTo({
              url: '/views/UserAuthenticationInfo/UserAuthenticationInfo?idenID=' + idenID,
            })
          }
        })
      }
    }
  },

  //车主
  mtOwnerUpdate(idenID){
    console.log('车主')
    let Authorization = wx.getStorageSync('Authorization')
    let identity = this.data.identity;//身份（0个人,1企业）
    let creditCode = this.data.creditCode;//统一信用代码
    let nameEnterprise = this.data.nameEnterprise;//企业名称
    let contacts = this.data.contacts;//联系人
    let phone = this.data.phone;//联系电话
    let idNumber = this.data.idNumber;//身份证号码
    let corporateId = this.data.corporateId;//身份证正面
    let backViewIdCard = this.data.backViewIdCard;//身份证反面
    let licensePlate = this.data.licensePlate;//车牌号码
    let driveJust = this.data.driveJust;//驾照正面
    let driveBack = this.data.driveBack;//驾照反面
    let businessLicense = this.data.businessLicense;//营业执照
    let transportPermit = this.data.transportPermit;//道路许可证照片
  },
})