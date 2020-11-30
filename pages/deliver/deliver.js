import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    deliverList:[{
      id:1,
      image: '/images/deliver/fbcy@3x_1.png',
      CHNname: '发布船源',
      ENGname: 'RELEASE SHIP SOURCE'
    },{
      id:2,
      image: '/images/deliver/fbhy@3x.png',
      CHNname: '发布货源',
      ENGname: 'PUBLISHED SOURCES'
    },{
      id:3,
      image: '/images/deliver/fbcy@3x.png',
      CHNname: '发布车源',
      ENGname: 'RELEASE OPTIONS'
    }],
    deliverId:null,
    show: false,
    vehicleStatus:false,
    shipStatus:false
  },
  showDialog(event){
    let dataset = event.currentTarget.dataset;
    let id = dataset.id;
    this.setData({
      deliverId:id,
      show:true
    })
  },
  handMode(event){
    let dataset = event.currentTarget.dataset;
    let index = dataset.index;
    switch(index){
      case '1':
        let shipStatus = this.data.shipStatus =! this.data.shipStatus;
        this.setData({
          vehicleStatus:false,
          shipStatus
        })
        break
      case '2':
        let vehicleStatus = this.data.vehicleStatus =! this.data.vehicleStatus;
        this.setData({
          shipStatus:false,
          vehicleStatus
        })
        break
    }
  },
  handDialog(event){
    console.log(event.detail);
    console.log(this.data.deliverId)
  },
  onClose() {
    this.setData({ close: false });
  },
})