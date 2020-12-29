import API from "../request/api";
import startWebSocket from "../request/startWebSocket";

// socket已经连接成功
let socketOpen = false
// socket已经调用关闭function
let socketClose = false
// socket发送的消息队列
let socketMsgQueue = []
// 判断心跳变量
let heart = ''
// 心跳失败次数
let heartBeatFailCount = 0
// 终止心跳
let heartBeatTimeOut = null;
// 终止重新连接
let connectSocketTimeOut = null;

const webSocket = {
    data:{
        action:null,//枚举动作
        msg:null,//发送的消息
        senderId:null,//自己的ID
        receiverId:null//对方的ID
    },
    // 创建一个 WebSocket 连接
    connectSocket:function(options){
        console.log(options)
        this.data.action = options.action;
        this.data.msg = options.msg;
        this.data.senderId = options.senderId;
        this.data.receiverId = options.receiverId;


        socketOpen = false;
        socketClose = false;
        socketMsgQueue = [];
        wx.connectSocket({
          url: API.UserFriendChat,
          success:(res) => {
              if(options){
                options.success && options.success(res);
              }
          },
          fail:(err) => {
              if(options){
                options.fail && options.fail(res);
              }
          }
        })
    },

    sendSocketMessage:function(data){
        let senderId = data.senderId;//自己的ID
        let receiverId = data.receiverId;//对方的ID
        let msg = data.msg;
        let action = data.action;
        let chatMsg = new startWebSocket.ChatMsg(senderId,receiverId,msg,null);//构建chatMsg
        let dataContent = new startWebSocket.DataContent(action, chatMsg, null);// 构建DataContent
        if(socketOpen){
            console.log(123)
            wx.sendSocketMessage({
                data: JSON.stringify(dataContent),
                success:(res) => {
                    console.log(res)
                },
                fail:(err) => {
                    console.log(err)
                }
            })
        }else{
            socketMsgQueue.push(data)
        }
    },

    // 关闭 WebSocket 连接
    closeSocket:function(options){
        if(connectSocketTimeOut){
            clearTimeout(connectSocketTimeOut);
            connectSocketTimeOut = null;
        }
        socketClose = true;
        this.stopHeartBeat();
        wx.closeSocket({
          success:(res) => {
            console.log('websocket已关闭')
            if(options){
                options.success && options.success(res)
            }
          },
          fail:(err) => {
            if(options){
                options.success && options.success(err)
            }
          }
        })
    },

    // 收到消息回调
    onSocketMessageCallback:function(){

    },

    //开始心跳
    startHeartBeat:function(){
        console.log('socket开始心跳')
        heart = 'heart';
        this.heartBeat()
    },

    //结束心跳
    stopHeartBeat:function(){
        console.log('socket结束心跳');
        heart = '';
        if(heartBeatTimeOut){
            clearTimeout(heartBeatTimeOut);
            heartBeatTimeOut = null;
        }
        if(connectSocketTimeOut){
            clearTimeout(connectSocketTimeOut);
            connectSocketTimeOut = null;
        }
    },

    //心跳
    heartBeat:function(){
        if(!heart){
            return
        }

        let senderId = this.data.senderId;//自己的ID
        let receiverId = this.data.receiverId;//对方的ID
        let msg = this.data.msg;
        let action = this.data.action;
        let chatMsg = new startWebSocket.ChatMsg(senderId,receiverId,msg,null);//构建chatMsg
        let dataContent = new startWebSocket.DataContent(action, chatMsg, null);// 构建DataContent

        if(socketOpen){
            wx.sendSocketMessage({
              data: JSON.stringify(dataContent),
              success:(res) => {
                console.log('socket心跳成功');
                  if(heart){
                    heartBeatTimeOut = setTimeout(() => {
                        this.heartBeat()
                    },7000)
                  }
              },
              fail:(err) => {
                console.log('socket心跳失败');
                if(heartBeatFailCount  > 2){
                    this.connectSocket();
                }
                if(heart){
                    heartBeatTimeOut = setTimeout(() => {
                        this.heartBeat()
                    },7000);
                }
                heartBeatFailCount++
              }
            })
        }
    }
}

//监听连接打开
wx.onSocketOpen((result) => {
    if(socketClose){
        webSocket.closeSocket();
    }else{
        socketOpen = true;
    }
    socketMsgQueue = [];
    webSocket.startHeartBeat();
})

//监听错误
wx.onSocketError((result) => {
    console.log(result)
})

//监听接收消息
wx.onSocketMessage((result) => {
    webSocket.onSocketMessageCallback(result)
})

//监听关闭
wx.onSocketClose((result) => {
    console.log('WebSocket 已关闭！')
    if(!socketClose){
        clearTimeout(connectSocketTimeOut)
        connectSocketTimeOut = setTimeout(() => {
            webSocket.connectSocket()
        },3000)
    }
})



module.exports = webSocket
