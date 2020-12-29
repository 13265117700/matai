const PREFIX  = 'http://8.129.87.113:8005';
const WebSocket = 'ws://8.129.87.113:8088';
export default {
    UserFriendChat:`${WebSocket}/ws`,//websocket连接通信

    // 微信登录
    wxLogin: `${PREFIX}/login/code`,
    
    //上传API
    imageUpload: `${PREFIX}/oss/file/upload`,//图片上传
    videoUpload: `${PREFIX}/oss/file/videoUpload`,//视频上传

    //用户API
    userInfo: `${PREFIX}/user/information/mtUserIdS`,//用户查询
    UserShipAdd:`${PREFIX}/user/ship/mtShipSave`,//用户添加船舶
    UserShipQuery:`${PREFIX}/user/ship/myFriendsRequestFriends`,//用户船列表查询
    UserShipInfoQuery:`${PREFIX}/user/ship/findByShipId`,//用户船信息查询

    UserMtCargoSave:`${PREFIX}/user/cargo/mtCargoSave`,//用户货源添加
    UserMtCargoQuery:`${PREFIX}/user/cargo/mtCargoFriends`,//用户货源列表查询

    UserFriendsListL:`${PREFIX}/user/friend/myFriendFriends`,//用户好友列表
    UserFriendSearch:`${PREFIX}/user/friend/searchFriends`,//用户好友搜索
    UserFriendRequest:`${PREFIX}/user/friend/friendApplication`,//用户好友申请
    UserFriendRequestList:`${PREFIX}/user/friend/myFriendsRequestFriends`,//用户好友申请列表
    UserFriendVerification:`${PREFIX}/user/friend/agreeOrRefuse`,//用户好友验证
    UserFriendChatMsg:`${PREFIX}/user/mtChatMsg/informationNotSignedByUsers`,//查询用户未签收的信息

    
    mtShipownerUpdate:`${PREFIX}/user/information/mtShipownerUpdate`,//船东信息修改
    mtCargoOwnerUpdate:`${PREFIX}/user/information/mtCargoOwnerUpdate`,//货主信息修改
    mtOwnerUpdate:`${PREFIX}/user/information/mtOwnerUpdate`,//车主信息修改
    userAppointFriends:`${PREFIX}/user/appoint/appointFriends`,//船东\货主接单查询


    //前端API
    frontDeskShipTypeList:`${PREFIX}/reception/mtTypeShip/mtNameGoodsFriends`,//船类型列表
    frontDeskCargoList:`${PREFIX}/reception/mtNameGoods/mtNameGoodsFriends`,//货物名列表
    frontDeskWharfList:`${PREFIX}/reception/mtWharf/findAll`,//码头列表查询
}