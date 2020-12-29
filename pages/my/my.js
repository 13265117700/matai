const { $Toast } = require('../../miniprogram_npm/iview-weapp/base/index');
import User from '../../models/user/user';

Page({
  data: {
    userInfo:null,
    // 身份认证开关
    visible: false,
    // 认证方式开关
    ahtcShow:false,
    // 认证身份ID
    idenID:null,
    // 认证方式ID
    identity:null,
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
        state:true,
        ceilItem:[{
          icon:'/images/my/hzrz@3x.png',
          text:'身份认证',
          id:'112'
        }]
      },{
        state:true,
        ceilItem:[{
          icon:'/images/my/hzrz@3x.png',
          text:'我的认证资料',
          id:'169'
        }]
      },{
        state:true,
        ceilItem:[{
          icon:'/images/my/xxzx@3x.png',
          text:'我的好友',
          id:'113'
        }]
      },{
        //船管理
        state:true,
        ceilItem:[{
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
        }]
      },{
        //货管理
        state:true,
        ceilItem:[{
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
        //车管理
        state:true,
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
        state:true,
        ceilItem:[{
          icon:'/images/my/zjls@3x.png',
          text:'偏好设置',
          id:'114'
        }]
      },{
        state:true,
        ceilItem:[{
          icon:'/images/my/wz@3x.png',
          text:'发票管理',
          id:'820'
        }]
      },{
        state:true,
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
      id:'153'
    },{
      name:'货主认证',
      status:false,
      id:'151'
    },{
      name:'车主认证',
      status:false,
      id:'152'
    }],
    // 认证方式列表
    ahtcList:[{
      name:'个人认证',
      active:false,
      id:'0'
    },{
      name:'企业认证',
      active:false,
      id:'1'
    }],
  },

  onShow(){
    this.showtabBar()
    this.displayModule();
  },

  showtabBar:function(){
    if(typeof this.getTabBar === "function" && this.getTabBar()){
      this.getTabBar().setData({
        activeIndex:4
      })
    }
  },

  //如果申请认证区分显示模块
  displayModule:function(){
    let Authorization = wx.getStorageSync('Authorization');
    console.log(Authorization)

    let uId ='';
    if(Authorization){
      let params = {
        Authorization,
        uId
      }
      User.userInfo(params).then(res => {
        let user = res.data.data;
        
        if(user.mtCargoOwner.idNumber != null && user.mtCargoOwner.idNumber != ' '){
          //货
          user.idenID = user.mtCargoOwner.id;
          user.status = user.mtCargoOwner.status;
          this.setData({
            userInfo:user,
            ["ceilList[5].state"]:false,
            ["ceilList[3].state"]:false,
          })
        }else if(user.mtOwner.idNumber != null && user.mtOwner.idNumber != ' '){
          //车
          user.idenID = user.mtOwner.id;
          user.status = user.mtOwner.status;
          this.setData({
            userInfo:user,
            ["ceilList[4].state"]:false,
            ["ceilList[3].state"]:false,
          })
        }else if(user.mtShipowner.idNumber != null && user.mtShipowner.idNumber != ' '){
           //船
          user.idenID = user.mtShipowner.id;
          user.status = user.mtShipowner.status;
          this.setData({
            userInfo:user,
            ["ceilList[4].state"]:false,
            ["ceilList[5].state"]:false,
          })
        }else{
          this.setData({
            userInfo:user
          })
        }
        console.log(this.data.userInfo)

        // 如果已申请认证显示对应模块
        if(user.idenID){
          console.log('有idenID')
          this.setData({
            ["ceilList[0].state"]:false,
            ["ceilList[1].state"]:true
          })
        }else{
          console.log('没有idenID')
          this.setData({
            ["ceilList[1].state"]:false
          })
        }
      })
    }else{
      console.log(12312)
      this.setData({
        ["ceilList[1].state"]:false
      })
    }
  },
  
  // 登录
  bindLogin:function(){
    wx.navigateTo({
      url: '/pages/logs/logs',
    })
  },
  // 用户设置
  userSetUp:function(){
    console.log('用户设置')
    wx.navigateTo({
      url: '/views/UserSettings/UserSettings',
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
    let userInfo = this.data.userInfo;
    let dataset = event.currentTarget.dataset;
    let id = dataset.id;
    console.log(id)
    let Authorization = wx.getStorageSync('Authorization');
    if(Authorization){
      switch(id){
        // 身份认证
        case '112':
          this.setData({
            visible: true
          });
          break
        case '113':
          wx.navigateTo({
            url: '/views/MyFriend/MyFriend',
          })
          break
        case '114':
          wx.navigateTo({
            url: '/views/Preferences/Preferences',
          })
        case '115':
          wx.navigateTo({
            url: '/views/ResourcesAdmin/ResourcesAdmin?id='+id,
          })
          break
        case '169':
          wx.navigateTo({
            url: '/views/UserAuthenticationInfo/UserAuthenticationInfo?idenID=' + userInfo.idenID,
          })
          break
        case '192':
          wx.navigateTo({
            url: '/views/ResourcesAdmin/ResourcesAdmin?id='+id,
          })
          break
        case '567':
          console.log(567)
          wx.navigateTo({
            url: '/views/ReleaseAdmin/ReleaseAdmin?id=' + id,
          })
          break
        case '855':
          console.log(855)
          wx.navigateTo({
            url: '/views/ReleaseAdmin/ReleaseAdmin?id=' + id,
          })
          break
        case '609':
          wx.navigateTo({
            url: '/views/ReleaseAdmin/ReleaseAdmin?id=' + id,
          })
          break
        case '820':
          wx.navigateTo({
            url: '/views/InvoiceAdmin/InvoiceAdmin',
          })
          break
      }
    }else{
      wx.navigateTo({
        url: '/pages/logs/logs',
      })
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
      idenID:id
    })
  },
  // 确认认证身份
  handIdentitOkay:function(){
    let id = this.data.idenID;
    console.log(id)
    if(id === null){
      $Toast({
        content: '未选择身份',
        type: 'warning'
      });
      return
    }
    switch(id){
      case '153':
        this.setData({
          ahtcTitle:'请选择船东认证方式',
          visible: false,
          ahtcShow:true,
        })
        break;
      case '151':
        this.setData({
          ahtcTitle:'请选择货主认证方式',
          visible: false,
          ahtcShow:true,
        })
        break;
      case '152':
        this.setData({
          ahtcTitle:'请选择车主认证方式',
          visible: false,
          ahtcShow:true,
        })
        break;
    }
    console.log(this.data.ahtcShow)
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
      identity:id
    })
  },
  // 确认认证方式
  handAhctOkay(){
    let idenID = this.data.idenID;
    let identity = this.data.identity;
    if(identity === null){
      $Toast({
        content: '未选择认证方式',
        type: 'warning'
      });
      return
    }else{
      wx.navigateTo({
        url: '/views/UserAuthentication/UserAuthentication?idenID='+idenID+'&identity='+identity,
      })
    }
  }
})