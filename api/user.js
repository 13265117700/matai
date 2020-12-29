import { HTTP } from '../request/request'

class User extends HTTP {
  // 获取用户信息
  fetchInfo() {
    return this.reqWithToken({
      method: 'GET',
      url: '/user/information/viewUser'
    })
  }
  // 修改用户信息
  updateInfo(data) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/information/modifyUserInformation',
      data
    })
  }
  /**
   * 获取用户关注列表
   * @param {choice } 1.查询我关注得人，2查询我得粉丝 
   * @param {uId} 用户id
   */
  fetchFollowList(data) {
    return this.req({
      method: 'GET',
      url: '/user/fans/findAll',
      data
    })
  }
}

export { User }