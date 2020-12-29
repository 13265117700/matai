// import User from '../../models/user/user';
import userFriend from '../../models/userFriend/userFriend';
Page({
    data: {
        activeIndex:0,
        tabbarStyle:'width: 30px; height: 18px;',
        buttonStyle:'border-radius: 10px;width: 200px;',
        tabBar:[
            {
                name:'聊天',
                icon:{
                    normal:'/images/my/MyFriend/lt@3x.png',
                    active:'/images/my/MyFriend/lt1@3x.png'
                }
            },
            {
                name:'通讯录',
                icon:{
                    normal:'/images/my/MyFriend/tx@3x.png',
                    active:'/images/my/MyFriend/tx1@3x.png'
                }
            }
        ],
        myFriendList:[],//好友列表
        total:null,//好友数量
        show:false,//弹框显示
        friendQequest:false,
        searchOf:[],//搜索出来的好友
        state:false,//是否申请添加好友
        VerifyStatus:0,//验证状态：0待通过，1添加，2已过期
        sendUserId:null,//验证通过对方的ID
        VerifyShow:false,//
        VerifyTitle:'待通过验证',
        VerifyItemInfo:{},//验证当前项信息
        unreadChatInfo:[],//未读聊天信息

        //验证按钮
        VerifyItemButton:[{
            status:1,
            title:'同意添加',
            customStyle:'border-radius: 10px;width: 200px;background: #E3211F;color: #fff;'
        },{
            status:0,
            title:'拒绝添加',
            customStyle:'border-radius: 10px;width: 200px;background: #e5e5e5;'
        }],
        value:'',
    },
    onShow: function () {
        this.UserUnreadChatInfo()
    },

    //点击底部导航
    handleClickTabbar(event){
        console.log(event)
        this.setData({
            activeIndex:event.detail
        })
        console.log(this.data.activeIndex)
        let activeIndex = this.data.activeIndex;
        if(activeIndex === 0){
            this.UserUnreadChatInfo()
        }else{
            this.getUserFriendList()
        }
    },

    //获取我的好友列表
    getUserFriendList(){
        let Authorization = wx.getStorageSync('Authorization');
        let page = 1;
        let rows = 10;
        let params = {Authorization, page, rows};
        userFriend.UserFriendsListL(params).then(res => {
            console.log(res)
            let myFriendList = res.data.data.rows;
            let total = res.data.data.total;
            this.setData({
                myFriendList,
                total
            })
            console.log(this.data.myFriendList)
        });
    },
    //显示好友搜索框
    showSearchFriends(){
        this.setData({
            friendQequest:false,
            show:true
        })
        this.getUserFriendapply()
    },
    //用户搜索好友
    getUserFriendSearch(e){
        let value = e.detail;
        let page = 1;
        let rows = 10;
        
        if(/^1[34578]\d{9}$/.test(value)){
            let params = { page, rows, phone:value }
            userFriend.UserFriendSearch(params).then(res => {
                let searchOf = res.data.data;
                console.log(searchOf)
                this.setData({
                    searchOf,
                    friendQequest:false,
                })
            })
        }else{
            let params = { page, rows, nickName:value }
            userFriend.UserFriendSearch(params).then(res => {
                let searchOf = res.data.data;
                console.log(searchOf)
                this.setData({
                    searchOf,
                    friendQequest:false,
                })
            })
        }
    },
    //申请添加好友
    handleAddFriend(e){
        let acceptUserId  = e.currentTarget.dataset.id;
        console.log(acceptUserId)
        let Authorization = wx.getStorageSync('Authorization');
        let params = { Authorization, acceptUserId  };
        userFriend.UserFriendRequest(params).then(res => {
            console.log(res)
            if(res.data.state === 200){
                wx.showToast({
                  title: '申请成功,请等待同意',
                })
                this.setData({
                    state:true
                })
            }else{
                wx.showToast({
                  title: res.data.message,
                })
            }
        })
    },
    //显示好友申请列表
    newFriendAgreeShow(){
        this.setData({
          show:true,
          friendQequest:true
        })  
        this.getUserFriendapply()
    },
    // 获取好友申请列表
    getUserFriendapply(){
        let friendQequest = this.data.friendQequest;
        if(friendQequest){
            let Authorization = wx.getStorageSync('Authorization');
            console.log(Authorization)
            let page = 1;
            let rows = 10;
            let params = { Authorization, page, rows }
            userFriend.UserFriendRequestList(params).then(res => {
                console.log(res)
                let searchOf = res.data.data;
                this.setData({
                    searchOf
                })
                console.log(this.data.searchOf)
            })
        }else{
            this.setData({
                searchOf:[]
            })
        }
    },
    //打开验证
    verifyCurrentItem(e){
        console.log(e)
        let index = e.currentTarget.dataset.index;
        let sendUserId = e.currentTarget.dataset.id;
        console.log(sendUserId)
        let searchOf = this.data.searchOf;
        let VerifyItemInfo = searchOf.rows[index];
        this.setData({
            sendUserId,
            VerifyItemInfo,
            VerifyShow:true,
            show:false
        })
        console.log(this.data.VerifyItemInfo)
    },
    //确认验证信息
    handleVerifyItemButton(e){
        let Authorization = wx.getStorageSync('Authorization');
        let sendUserId = this.data.sendUserId;
        let state = e.currentTarget.dataset.status;
        let params = { Authorization, sendUserId, state }
        console.log(params)
        userFriend.UserFriendVerification(params).then(res => {
            console.log(res)
            if(res.data.state === 200){
                wx.showToast({
                  title: '成功添加好友',
                })
                this.setData({
                    VerifyShow:false,
                    show:false
                })
            }
        })
    },
    //关闭弹框
    onCloseAddress(){
        console.log('关闭')
        this.setData({
            show:false,
            VerifyShow:false,
            value:''
        })
    },

    //用户未读好友聊天信息
    UserUnreadChatInfo(){
        let Authorization = wx.getStorageSync('Authorization');
        let page = 1;
        let rows = 10;
        let params = {Authorization, page, rows};
        userFriend.UserFriendChatMsg(params).then(res => {
            let rows = res.data.data.rows;
            console.log(rows)
            this.setData({
                unreadChatInfo:rows
            })
        })
    },

    // 打开聊天对话
    BeganToChat(e){
        console.log(e)
        let receiverid = e.currentTarget.dataset.receiverid;//好友的ID
        let senderid = e.currentTarget.dataset.senderid;//我的ID
        console.log(receiverid,senderid)
        wx.navigateTo({
            url: '/views/chat/chat?receiverid='+receiverid+'&senderid='+senderid,
        })
    },

    

    // gotoChat(e){
    //     console.log(e)
    //     wx.navigateTo({
    //       url: '/views/chat/chat',
    //     })
    // },
    handleAddUser(e){
        console.log(e)
    }
})