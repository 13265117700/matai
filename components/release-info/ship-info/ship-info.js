import User from "../../../models/user/user"
Component({
    properties: {

    },
    data: {
        buttonStyle:'border-top-left-radius: 10px;border-top-right-radius: 10px;',
        inputList:[{
            id:2000001,
            type:'default',
            title:'选择船舶',
            placeholder:'请选择船舶',
            border:true,
        },{
            id:2000002,
            type:'default',
            title:'空船港',
            placeholder:'请选择空船港',
            border:true,
        },{
            id:2000003,
            type:'picker',
            mode:'date',
            title:'空船期',
            pickerDate:null,
            placeholder:'如2020-08-12 ±1天',
            border:false,
        }],
        popupShow:false,
        addressShow:false,
        popupStyle:{},
        shipList:['杭州', '宁波', '温州', '嘉兴', '湖州'],
        terminalList:[],
        id:null,
        detailedAddress:null,
        wharfID:null,
    },
    methods: {
        onMyEvent(e){
            console.log(e)
            let detailedAddress = e.detail.detailedAddress;
            // let propID = e.detail.propID;
            let wharfID = e.detail.wharfID;
            if(detailedAddress != null){
                this.setData({
                    ['inputList[1].placeholder']:detailedAddress,
                    detailedAddress,
                    wharfID,
                    addressShow:false
                })
                console.log(this.data.inputList)
            }
        },
        onCloseAddress(){
            this.setData({
                addressShow:false,
            })
            this.triggerEvent('myevent','发布货源');
        },
        handleOpenPopup(e){
            console.log(e)
            let index = e.currentTarget.dataset.index;
            let id = e.currentTarget.dataset.id;
            if(index === 0){
                let popupStyle = {
                    position:'bottom',
                    closeable:true,
                    closeIcon:'close'
                }
                this.setData({
                    popupStyle,
                    popupShow:true
                })
                this.getShipInfo()
            }else{
                this.setData({
                    id,
                    addressShow:true
                })
                this.triggerEvent('myevent','选择空船港');
            }
        },
        getShipInfo(){
            console.log(123)
            let params = {
                Authorization:wx.getStorageSync('Authorization'),
                page:1,
                rows:10,
            }
            User.myFriendsRequestFriends(params).then(res => {
                console.log(res)
            })
        },
        onClose(){
            this.setData({
                popupShow:false
            })
        },
        //确定船舶
        handlePickerItem(e){
            console.log(e)
            this.setData({
                ['inputList[0].placeholder']:e.detail.value
            })
        },
        handleConfirmShip(e){
            console.log(e)
            this.setData({
                popupShow:false
            })
        },
        
        // 时间弹框确认按钮
        handleconfirm(e){
            let index = e.currentTarget.dataset.index;
            let value = e.detail.value;
            this.setData({
                [`inputList[${index}].pickerDate`]:value + '±1天'
            })
        },
    }
})
