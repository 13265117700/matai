import User from '../../models/user/user';
import WebSocket from '../../models/websocket/websocket';

Page({
    data: {
        receiverid:null,
        senderid:null,
        msg:'',
        bottom:0,
        talkContent:[
            { 
                img:'/images/my/MyFriend/add.png',
                text:'你好，可以认识一下吗？',
                isMine:false
            },
            {
                img:'/images/my/MyFriend/add.png',
                text:'我叫****靓女',
                isMine:false
            },
            {
                img:'/images/my/ye@3x.png',
                text:'你好，很高兴认识你****靓女',
                isMine:true
            },
            {
                img:'/images/my/ye@3x.png',
                text:'平时有什么爱好',
                isMine:true
            },
            {
                img:'/images/my/MyFriend/add.png',
                text:'喜欢看书',
                isMine:false
            }
        ],
        userInfo:null
    },

    onLoad: function (options) {
        console.log(options)
        this.setData({
            receiverid:options.receiverid,
            senderid:options.senderid
        })

       this.WebSocketInit()
    },


    //监听websocket连接与接收信息
    WebSocketInit:function(){
        let senderId = this.data.senderid;//自己的ID
        let receiverId = this.data.receiverid;//对方的ID
        let msg = null;
        let action = 1;
        let params = {senderId,receiverId,msg,action}
        WebSocket.connectSocket(params)
        WebSocket.onSocketMessageCallback = this.onSocketMessageCallback;
    },

    //关闭websocket连接
    onUnload:function(){
        WebSocket.closeSocket()
    },

    //websocket通信接收信息
    onSocketMessageCallback:function(msg){
        console.log(msg)
    }, 

    onShow: function () {
        this.getUserInfo()
    },

    //获取用户信息
    getUserInfo(){
        let Authorization = wx.getStorageSync('Authorization');
        let uId = '';
        User.userInfo({Authorization,uId}).then(res => {
            let user = res.data.data;
            if(user.mtCargoOwner.idNumber != null && user.mtCargoOwner.idNumber != ' '){
                user.idenID = user.mtCargoOwner.id;
            }else if(user.mtOwner.idNumber != null && user.mtOwner.idNumber != ' '){
                user.idenID = user.mtOwner.id;
            }else if(user.mtShipowner.idNumber != null && user.mtShipowner.idNumber != ' '){
                user.idenID = user.mtShipowner.id;
            }
            this.setData({
                userInfo:user
            })
            console.log(this.data.userInfo)
        })
    },

    focusEven(e){
        // console.log(e)
        this.setData({
            bottom: e.detail.height *2
        })
    },
    blurEven(e){
        this.setData({
            bottom:0
        })
    },

    //聊天输入框
    handleInputValue(e){
        this.setData({
            msg:e.detail.value
        })
    },

    //聊天发送信息
    handleChatSend(){
        let receiverId = this.data.receiverid;
        let senderId = this.data.senderid;
        let msg = this.data.msg;
        let action = 2;
        let params = {receiverId,senderId,msg,action }
        WebSocket.sendSocketMessage(params)
    },
    gotoCrewList(e){
        console.log(e)
        let idenID = this.data.userInfo.idenID;
        wx.navigateTo({
          url: '/views/FindResources/FindResources?idenID='+idenID,
        })
        console.log(idenID)
    }
})