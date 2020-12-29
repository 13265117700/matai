import { HTTP } from '../../request/request'

class Product extends HTTP {
  // 查设计作品列表
  fetchList(data) {
    return this.req({
      method: 'GET',
      url: '/reception/designer/designWorks/findAll',
      data
    })
  }

  fetchList2(data) {
    return this.reqWithToken({
      method: 'GET',
      url: '/reception/designer/designWorks/findAll',
      data
    })
  }

  // 查已关注设计师作品列表
  fetchFollowDesignerList(data) {
    return this.reqWithToken({
      method: 'GET',
      url: '/user/fans/userForumDesignWorksFindAll',
      data
    })
  }

  // 查设计作品评论列表
  fetchComment(data) {
    return this.req({
      method: 'GET',
      url: '/reception/comment/commentReplyFindAll',
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
  // 查用户设计作品列表
  fetchUserDesignList(data) {
    return this.req({
      method: 'GET',
      url: '/user/designer/designWorks/findAll',
      data
    })
  }

  // 查用户专辑 传入用户id
  fetchUserAlbumList(id) {
    return this.req({
      method: 'GET',
      url: '/user/designer/album/viewF',
      data: {
        uId: id
      }
    })
  }
  // 查专辑作品 传入专辑id
  fetchUserAlbumInfo(id) {
    return this.req({
      method: 'GET',
      url: '/user/designer/album/viewCsDesignWorks',
      data: {
        csAlbumId: id
      }
    })
  }

  // 查设计作品详情
  fetchInfo(data) {
    return this.req({
      method: 'GET',
      url: '/reception/designer/designWorks/view',
      data
    })
  }

  // 作品查看数+1 传入作品id
  plusViewNumber(id) {
    return this.req({
      method: 'POST',
      url: '/reception/designer/designWorks/number',
      data: {id}
    })
  }

  // 收藏设计作品 传入作品id
  doColl(id) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/follow/collectionWorks',
      data: { csDesignWorksId: id }
    })
  }

  // 取消收藏设计作品 传入作品id
  cancelColl(id) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/follow/unIncludeUserFollow',
      data: { id }
    })
  }

  // 查询是否已收藏作品 传入作品id
  getColl(id) {
    return this.reqWithToken({
      method: 'GET',
      url: '/user/follow/areYouConcerned',
      data: {csDesignWorksId: id}
    })
  }

  // 查询是否已点赞作品 传入作品id与用户id
  getPointPraise(id, uid) {
    return this.reqWithToken({
      method: 'GET',
      url: '/user/pointPraise/areYouConcerned',
      data: {designWorksId: id, uId: uid}
    })
  }
  // 点赞作品 传入作品id
  doPointPraise(id) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/pointPraise/create',
      data: {designWorksId : id}
    })
  }
  // 取消点赞作品 传入作品id
  cancelPointPraise(id) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/pointPraise/unIncludeUserFollow',
      data: {designWorksId: id}
    })
  }

  // 查学院课程列表
  fetchCollgeList(data) {
    return this.req({
      method: 'GET',
      url: '/reception/college/collegeFindAll',
      data
    })
  }
  // 获取活动栏目列表
  fetchEventColumn(data) {
    return this.req({
      method: 'GET',
      url: '/reception/articleColumn/articleFindAll',
      data
    })
  }
  // 获取活动列表
  fetchEventList(data) {
    return this.req({
      method: 'GET',
      url: '/reception/article/articleFindAll',
      data
    })
  }

  // 获取专题列表
  fetchSpecialList(data) {
    return this.req({
      method: 'GET',
      url: '/reception/designer/special/specialFindAll',
      data
    })
  }
  // 获取专题作品列表 传入id
  fetchSpecialInfo(data) {
    return this.req({
      method: 'GET',
      url: '/reception/designer/special/viewDesignWorks',
      data
    })
  }

  // 查询设计师资料 传入设计师id
  getDesignerInfo(id) {
    return this.req({
      method: 'GET',
      url: '/user/information/viewUser',
      data: {
        id
      }
    })
  }

  // 设计师关注 传入设计师id
  doFans(fId) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/fans/create',
      data: {
        fId
      }
    })
  }

  // 取消设计师关注 传入设计师id
  doFansCancel(fId) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/fans/delete',
      data: {
        fId
      }
    })
  }

  // 查询设计师是否已关注 传入设计师id
  doFansCheck(fId) {
    return this.reqWithToken({
      method: 'GET',
      url: '/user/fans/areYouConcerned',
      data: {
        fId
      }
    })
  }

  // 查询用户收藏的专辑列表
  getUserCollAlbumList(data) {
    return this.reqWithToken({
      method: 'GET',
      url: '/user/followAlbum/findAll',
      data
    })
  }

  // 查询用户收藏的作品
  getUserCollDesignList(data) {
    return this.req({
      method: 'GET',
      url: '/user/follow/findAll',
      data
    })
  }

  // 对作品发表评论
  doComment(data) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/comment/create',
      data
    })
  }
  // 回复评论
  doComment2(data) {
    return this.reqWithToken({
      method: 'POST',
      url: '/user/comment/commentReplyCreate',
      data
    })
  }
}

export { Product }
