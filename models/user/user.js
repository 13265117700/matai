import request from '../request/request';
import api from '../request/api';

export default{
    //用户查询
    userInfo:function(data){
        return request.get(api.userInfo, data)
    },
     //用户添加船舶
     UserShipAdd:function(data){
        return request.post(api.UserShipAdd, data)
    },
     //用户船列表查询
     UserShipQuery:function(data){
        return request.get(api.UserShipQuery, data)
    },
    //用户船信息查询
    UserShipInfoQuery:function(data){
        return request.get(api.UserShipInfoQuery, data)
    },


    //船东信息修改
    mtShipownerUpdate:function(data){
        return request.post(api.mtShipownerUpdate, data)
    },
    //货主信息修改
    mtCargoOwnerUpdate:function(data){
        return request.post(api.mtCargoOwnerUpdate, data)
    },
    //车主信息修改
    mtOwnerUpdate:function(data){
        return request.post(api.mtOwnerUpdate, data)
    },
   
   
    //用户货源添加
    UserMtCargoSave:function(data){
        return request.post(api.UserMtCargoSave, data)
    },
    //船东\货主接单查询
    userAppointFriends:function(data){
        return request.get(api.userAppointFriends, data)
    }
}