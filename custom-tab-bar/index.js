// custom-tab-bar/index.js
import User from "../models/user/user"
Component({
    data: {
        activeIndex:0,
        tabBar:[
            {
                pagePath:'/pages/index/index',
                name:'首页',
                tips:'',
                large:false,
                icon:{
                    normal:'/images/index/index1-3.png',
                    active:'/images/index/index2-3.png'
                }
            },
            {
                pagePath:'/pages/myFollow/myFollow',
                name:'我的关注',
                tips:'',
                large:false,
                icon:{
                    normal:'/images/myFollow/myFollow1-3.png',
                    active:'/images/myFollow/myFollow2-3.png'
                }
            },
            {
                pagePath:`/pages/deliver/deliver`,
                name:'发布',
                tips:'',
                large:true,
                icon:{
                    normal:'/images/deliver/deliver.png',
                    active:'/images/deliver/deliver.png'
                }
            },
            {
                pagePath:'/pages/order/order',
                name:'订单',
                tips:'',
                large:false,
                icon:{
                    normal:'/images/order/order1-3.png',
                    active:'/images/order/order2-3.png'
                }
            },
            {
                pagePath:'/pages/my/my',
                name:'我的',
                tips:'',
                large:false,
                icon:{
                    normal:'/images/my/my1-3.png',
                    active:'/images/my/my2-3.png'
                }
            }
        ],
        IdentityID:null
    },
    lifetimes:{
        attached:function(){
            this.getUserInfo()
        }
    },
    methods: {
        onChange(e){
            let index = e.detail.current;
            let IdentityID = this.data.IdentityID;
            if(index === 2){
                wx.navigateTo({
                  url: '/views/ResourceAdd/ResourceAdd?id='+IdentityID,
                })
            }else{
                wx.switchTab({
                    url: this.data.tabBar[index].pagePath,
                })
            }
        },
        getUserInfo(){
            let Authorization = wx.getStorageSync('Authorization');
            let uid = ''
            User.userInfo({Authorization,uid}).then(res => {
                let mtCargoOwner = res.data.data.mtCargoOwner;//货主身份
                let mtOwner = res.data.data.mtOwner;//车主身份
                let mtShipowner = res.data.data.mtShipowner;//船东身份
                if(mtCargoOwner.idNumber){
                    console.log('货主')
                    this.setData({
                        IdentityID:'855'
                    })
                    return
                }
                if(mtOwner.idNumber){
                    console.log('车主')
                    this.setData({
                        IdentityID:'609'
                    })
                    return
                }
                if(mtShipowner.idNumber){
                    console.log('船东')
                    this.setData({
                        IdentityID:'567'
                    })
                    return
                }
            })
        }
    }
})
