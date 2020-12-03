import request from '../request/request';
import api from '../request/api';

export default{
    weChatLogin:function(code='',data,header={}){
        return request.post(api.login,code)
    }
}