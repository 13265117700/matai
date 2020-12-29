import { HTTP } from '../utils/http-p.js'

let http = new HTTP()

class CollegePModel extends HTTP {
 // data = null
 
  getHotList() {
    return this.request({
      url: '/reception/collegeColumn/findAll?pId=0&page=1&rows=100'
    })

  }

  
}


export {
  CollegePModel
}