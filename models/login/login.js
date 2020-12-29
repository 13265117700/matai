import request from '../request/request';
import api from '../request/api';

export default{
    weChatLogin:function(data){
        return request.post(api.login,data)
    }
}