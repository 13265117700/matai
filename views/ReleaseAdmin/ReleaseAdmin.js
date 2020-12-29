// views/ReleaseAdmin/ReleaseAdmin.js
Page({
  data: {
    navBarTitle:'我发布的船源',
    addButton:'添加船源',
    buttonStyle:'border-top-left-radius: 10px;border-top-right-radius: 10px;',
    id:null,
    statusList:[{
      status:3,
      title:'上架中'
    },{
      status:2,
      title:'已下架'
    }],
    upAndDownState:1,
  },

  onLoad: function (options) {
    this.setData({
      id:options.id
    })
  },

  onShow: function () {
    this.isRelease()
  },

  switchButton(e){
    console.log(e)
    let upAndDownState = e.detail.name;
    this.setData({
      upAndDownState
    })
  },

  isRelease(){
    console.log(this.data.id)
    let id = this.data.id;
    switch(id){
      case '567':
        this.shipSourceAdmin()
        break
      case '855':
        this.cargoSourceAdmin()
        break
      case '609':
        this.carSourceAdmin()
        break
    }
  },

  //船源管理
  shipSourceAdmin(){
    let upAndDownState = this.data.upAndDownState;
    console.log(upAndDownState)
    this.setData({
      navBarTitle:'我发布的船源',
      addButton:'添加船源',
    })
  },

  //货源管理
  cargoSourceAdmin(){
    let upAndDownState = this.data.upAndDownState;
    console.log(upAndDownState)
    this.setData({
      navBarTitle:'我发布的货源',
      addButton:'添加货源',
    })
  },

  //车源管理
  carSourceAdmin(){
    let upAndDownState = this.data.upAndDownState;
    console.log(upAndDownState)
    this.setData({
      navBarTitle:'我发布的车源',
      addButton:'添加车源',
    })
  },

  addButton(){
    let id = this.data.id;
    console.log(id)
    wx.navigateTo({
      url: '/views/ResourceAdd/ResourceAdd?id=' + id,
    })
  }
})