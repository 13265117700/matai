import { HTTP } from '../../request/request'

class Sign extends HTTP {
  // 查广告图
  doSign(data) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/attendanceRecord/updateAttendanceRecord',
      data
    })
  }
}

export { Sign }
