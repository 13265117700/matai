import { HTTP } from '../request/request'

class Product extends HTTP {
  fetchList(data) {
    return this.req({
      method: 'GET',
      url: '/reception/designer/designWorks/findAll',
      data
    })
  }

  getCollegeFindAll(data) {
    return this.req({
      method: 'GET',
      url: '/reception/college/collegeFindAll',
      data
    })
  }

  getViewPointsMallColumnId(data) {
    return this.req({
      method: 'GET',
      url: '/reception/collegeColumn/viewPointsMallColumnId',
      data
    })
  }
 

  getCollegeViewId(data) {
    return this.req({
      method: 'GET',
      url: '/reception/college/view',
      data
    })
  }

  postCreateCollegeShoppingCart(data) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/collegeShoppingCart/createCollegeShoppingCart',
      data
    })

  }

  getCollegeShoppingCartAll(data) {
    return this.reqWithToken({
      method: 'GET',
      url: '/user/collegeShoppingCart/collegeShoppingCartAll',
      data
    })

  }

  postDeleteCollegeShoppingCartId(data) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/collegeShoppingCart/deleteCollegeShoppingCartId',
      data
    })

  }
  
  postCreateCollegeOrder(data) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/collegeOrder/createCollegeOrder',
      data
    })

  }
  


  getViewOrderId(data) {
    return this.reqWithToken({
      method: 'GET',
      url: '/user/collegeOrder/viewOrderId',
      data
    })
  }


  getPayXcx(data) {
    return this.reqWithToken({
      method: 'GET',
      url: '/api/wx/pay/xcx',
      data
    })

  }


  getGlobalSettings(data) {
    return this.req({
      method: 'GET',
      url: '/admin/globalSettings/view',
      data
    })
  }

  getCollegeBalancePay(data) {
    return this.reqWithToken({
      method: 'GET',
      url: '/user/balancePay/collegeBalancePay',
      data
    })
  }
 

  getOrderFindAll(data) {
    return this.reqWithToken({
      method: 'GET',
      url: '/user/collegeOrder/orderFindAll',
      data
    })
  }


  getUserCollegeFindAll(data) {
    return this.reqWithToken({
      method: 'GET',
      url: '/reception/college/collegeFindAll',
      data
    })
  }

  getCreateCollegeOrderFindAll(data) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/collegeUser/createCollegeOrder',
      data
    })
  }


  getPurchaseDisplayView(data) {
    return this.reqWithToken({
      method: 'GET',
      url: '/reception/college/purchaseDisplayView',
      data
    })
  }

  getCollegeEvaluation(data) {
    return this.reqWithToken({
      method: 'GET',
      url: '/user/collegeEvaluation/findAll',
      data
    })
  }


  postCollegeEvaluationPoint(data) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/collegeEvaluationPoint/pointPraise',
      data
    })
  }


  postDeletePointPraise(data) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/collegeEvaluationPoint/deletePointPraise',
      data
    })
  }

  postDeletePointPraise(data) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/collegeEvaluationPoint/deletePointPraise',
      data
    })
  }

  postUserCollege(data) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/userCollege/create',
      data
    })
  }


  postUserCollegeDelete(data) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/userCollege/delete',
      data
    })
  }

  getUserCollegeAreYouConcerned(data) {
    return this.reqWithToken({
      method: 'GET',
      url: '/user/userCollege/areYouConcerned',
      data
    })
  }

  postCreateCollegeEvaluatio(data) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/collegeEvaluation/createCollegeEvaluation',
      data
    })
  }


  getCollegeEvaluationId(data) {
    return this.reqWithToken({
      method: 'GET',
      url: '/user/collegeEvaluation/collegeEvaluationId',
      data
    })
  }

  getUserCollegeShouChang(data) {
    return this.reqWithToken({
      method: 'GET',
      url: '/user/userCollege/findAll',
      data
    })
  }
}

export { Product }
