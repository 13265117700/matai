const { $Toast } = require('../../miniprogram_npm/iview-weapp/base/index');
Page({
  data: {
    // 身份认证开关
    visible: false,
    // 认证方式开关
    ahtcShow:false,
    // 身份ID
    identitId:null,
    // 认证方式ID
    ahtcId:null,
    // 身份认证方式标题
    ahtcTitle:null,
    // 用户查看列表
    seeList:[{
      text:'余额',
      image:'/images/my/ye@3x.png',
      id:'12'
    },{
      text:'我的分销',
      image:'/images/my/dis@3x.png',
      id:'23'
    },{
      text:'银行卡',
      image:'/images/my/yhk@3x.png',
      id:'34'
    },{
      text:'资金流水',
      image:'/images/my/zjls@3x.png',
      id:'45'
    }],

    ceilList:[
      {
        ceilItem:[{
          icon:'/images/my/hzrz@3x.png',
          text:'身份认证',
          id:'112'
        }]
      },{
        ceilItem:[{
          icon:'/images/my/xxzx@3x.png',
          text:'我的好友',
          id:'113'
        }]
      },{
        ceilItem:[{
          icon:'/images/my/zjls@3x.png',
          text:'传动偏好设置',
          id:'114'
        },{
          icon:'/images/my/yhk@3x.png',
          text:'船舶管理',
          id:'115'
        },{
          icon:'/images/my/ye@3x.png',
          text:'船东待确认订单信息',
          id:'123'
        },{
          icon:'/images/my/xycx@3x.png',
          text:'船东订单',
          id:'234'
        },{
          icon:'/images/my/xxzx@3x.png',
          text:'船东保证金',
          id:'546'
        },{
          icon:'/images/my/wz@3x.png',
          text:'我发布的船源',
          id:'567'
        },]
      },{
        ceilItem:[{
          icon:'/images/my/fx@3x.png',
          text:'货主偏好设置',
          id:'776'
        },{
          icon:'/images/my/hzdd@3x.png',
          text:'货主待确认订单信息',
          id:'998'
        },{
          icon:'/images/my/hzdd@3x.png',
          text:'货主订单',
          id:'101'
        },{
          icon:'/images/my/hzbzj@3x.png',
          text:'货主保证金',
          id:'809'
        },{
          icon:'/images/my/fbcy@3x.png',
          text:'我发布的货源',
          id:'855'
        }]
      },{
        ceilItem:[{
          icon:'/images/my/clgl@3x.png',
          text:'车辆管理',
          id:'192'
        },{
          icon:'/images/my/wldd@3x.png',
          text:'物流待确认订单信息',
          id:'110'
        },{
          icon:'/images/my/wldd@3x.png',
          text:'物流订单',
          id:'120'
        },{
          icon:'/images/my/cdbzj@3x.png',
          text:'物流保证金',
          id:'100'
        },{
          icon:'/images/my/fbcy@3x.png',
          text:'我发布的车源',
          id:'609'
        }]
      },{
        ceilItem:[{
          icon:'/images/my/wz@3x.png',
          text:'我的地址',
          id:'820'
        }]
      },{
        ceilItem:[{
          icon:'/images/my/xycx@3x.png',
          text:'信用查询',
          id:'119'
        }]
      }
    ],
    // 身份列表
    identitList:[{
      name:'船东认证',
      status:false,
      id:'1'
    },{
      name:'货主认证',
      status:false,
      id:'2'
    },{
      name:'车主认证',
      status:false,
      id:'3'
    }],
    // 认证方式列表
    ahtcList:[{
      name:'个人认证',
      active:false,
      id:'a1a2a3'
    },{
      name:'企业认证',
      active:false,
      id:'b1b2b3'
    }],
  },
  
  // 登录
  bindLogin:function(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  // 用户设置
  userSetUp:function(){
    console.log('用户设置')
    wx.navigateTo({
      url: '/pages/my/userSetUp/userSetUp',
    })
  },
  // 人工智能服务
  userAi:function(){
    console.log('人工智能服务')
  },
  // 用户查看信息item
  seeItem:function(event){
    console.log('this.seeItem',event)
  },
  // 进入不同celiItem页面
  ceilItem:function(event){
    let dataset = event.currentTarget.dataset;
    let id = dataset.id;
    switch(id){
      // 身份认证
      case '112':
        this.setData({
          visible: true
        });
        break
      case '115':
        console.log('船管理')
        break
    }
  },
  // 关闭身份认证
  handleClose:function(){
    this.setData({
      visible:false
    })
  },
  // 选择认证身份
  handIdentit:function(e){
    let dataset = e.currentTarget.dataset;
    let id = dataset.id;
    let index = dataset.index;
    let identitList = this.data.identitList;
    identitList.forEach(d => d.status = false);
    identitList[index].status = !identitList[index].status;
    
    this.setData({
      identitList,
      identitId:id
    })
  },
  // 确认认证身份
  handIdentitOkay:function(){
    let id = this.data.identitId;
    if(id === null){
      $Toast({
        content: '未选择身份',
        type: 'warning'
      });
      return
    }
    switch(id){
      case '1':
        this.setData({
          ahtcTitle:'请选择船东认证方式',
          visible: false,
          ahtcShow:true,
        })
        break;
      case '2':
        this.setData({
          ahtcTitle:'请选择货主认证方式',
          visible: false,
          ahtcShow:true,
        })
        break;
      case '3':
        this.setData({
          ahtcTitle:'请选择车主认证方式',
          visible: false,
          ahtcShow:true,
        })
        break;
    }
  },
  // 认证方式选择
  handAhct(e){
    let dataset = e.currentTarget.dataset;
    let id = dataset.id;
    let index = dataset.index;
    let ahtcList = this.data.ahtcList;
    ahtcList.forEach(d => d.active = false);
    ahtcList[index].active = !ahtcList[index].active;
    
    this.setData({
      ahtcList,
      ahtcId:id
    })
  },
  // 确认认证方式
  handAhctOkay(){
    let identitId = this.data.identitId;
    let ahtcId = this.data.ahtcId;
    if(ahtcId === null){
      $Toast({
        content: '未选择认证方式',
        type: 'warning'
      });
      return
    }else{
      wx.navigateTo({
        url: '/pages/my/userIdentit/userIdentit?identitId='+identitId+'&ahtcId='+ahtcId,
      })
    }
  }
})