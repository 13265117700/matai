import { HTTP } from '../utils/http.js'

let http = new HTTP()

class CollegeModel extends HTTP {

  getLatest(sCallback){
    this.request({
      url:'/reception/collegeColumn/findAll?pId=0&page=1&rows=100',
      success:(res)=>{
        sCallback(res)
     
      }
    })
  }

  getAdvertising(sCallback){
    this.request({
      url:'/admin/advertisingMap/answerFindAll?advertisingColumnId=1&page=1&rows=10&state=2',
      success:(res)=>{
        sCallback(res)
     
      }
    })
  }

  getCollegeColumn(sCallback){
    this.request({
      url:'/reception/collegeColumn/findAll?pId=0&page=1&rows=100',
      success:(res)=>{
        sCallback(res)
     
      }
    })
  }



  

}


export {
  CollegeModel
}