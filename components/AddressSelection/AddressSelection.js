import mtWharf from '../../models/frontEnd/mtWharf';
Component({
    properties: {
        propID:String
    },
    lifetimes:{
        attached:function(){
            this.getAddress();
        }
    },
    data: {
        buttonStyle:'border-top-left-radius: 10px;border-top-right-radius: 10px;',
        addressName:[],//面包屑
        crumbsLength:null,//面包屑长度
        address:[],//每次获取的列表
        cellValue:'请选择码头',
        popupShow:false,//弹框显示/隐藏
        popupInputValue:null,//弹框input输入框
        pickerList:[],//选择列表
        detailedAddress:null,//详细地址
        wharfID:null,//地址ID
    },
    methods: {
        //获取地区
        getAddress(){
            let pId = 0;
            let page = 1;
            let rows = 10;
            let sortInt = 1;
            let params = { pId,page,rows,sortInt };
            mtWharf.frontDeskWharfList(params).then(res => {
                let rows = res.data.data.rows;
                let address = [];
                rows.forEach(data => {
                    data.active = false;
                    address.push(data)
                });
                this.setData({
                    address
                })
            })
        },
        getAddressChild(e){
            console.log(e)
            let index = e.currentTarget.dataset.index;
            let address = this.data.address;
            let addressName = this.data.addressName;
            let pId = e.currentTarget.dataset.id;
            let page = 1;
            let rows = 10;
            let sortInt = 1;
            let params = { pId,page,rows,sortInt }
            if(addressName.length <= 3){
                if(addressName.length === 2){
                    addressName.push(address[index],{name:'请选择码头'});
                    console.log(addressName)
                }else{
                    if(addressName.length === 3){
                        console.log(addressName)
                        addressName.splice(2,1,address[index])
                        addressName.push({name:'请选择码头'})
                    }else{
                        addressName.push(address[index]);
                    }
                }
                addressName.forEach(a => a.active = false);
                address.forEach(b => b.active = false)
                address[index].active = !address[index].active;
                mtWharf.frontDeskWharfList(params).then(res => {
                    let rows = res.data.data.rows;
                    let pro =[]
                    rows.forEach(data => {
                        data.active = false;
                        pro.push(data)
                    })
                    this.setData({
                        address:pro,
                        addressName,
                        crumbsLength:addressName.length
                    })
                })
            }
        },
        // 获取码头列表
        getWharfList(){
            let address = this.data.address;
            let pickerList = address.map(data => data.name);
            this.setData({
                pickerList,
                popupShow:true
            })

        },
        onClose(){
            this.setData({
                popupShow:false
            })
        },
        handlePopupInput(e){
            this.setData({
                popupInputValue:e.detail
            })
        },
        handleConfirmPicker(e){
            console.log(e)
            let index = e.detail.index;
            let value = e.detail.value;
            let popupInputValue = this.data.popupInputValue;
            let addressName = this.data.addressName;
            let address = this.data.address;
            console.log(address[index])
            if(popupInputValue != null && popupInputValue != ''){
                if(addressName.length > 3){
                    addressName.splice(3,1)
                }
                addressName.push({name:popupInputValue});
                let array = addressName.map(data => data.name);
                let detailedAddress = array.toString().replace(/,/g,'');
                this.setData({
                    detailedAddress,
                    cellValue:popupInputValue,
                    wharfID:address[index].id,
                    popupShow:false
                })
            }else{
                if(addressName.length > 3){
                    addressName.splice(3,1)
                }
                addressName.push(address[index])
                let array = addressName.map(data => data.name);
                let detailedAddress = array.toString().replace(/,/g,'');
                this.setData({
                    detailedAddress,
                    cellValue:value,
                    wharfID:address[index].id,
                    popupShow:false
                })
            }
        },

        //点击面包屑
        clickCrumbs(e){
            let addressName = this.data.addressName;
            let number = e.currentTarget.dataset.index;
            let index = number-1;
            if(index < 0){
                let pId = 0;
                let page = 1;
                let rows = 10;
                let sortInt = 1;
                let params = { pId,page,rows,sortInt };
                mtWharf.frontDeskWharfList(params).then(res => {
                    let rows = res.data.data.rows;
                    let address = [];
                    rows.forEach(data => {
                        if(data.id === addressName[number].id){
                            data.active = true
                        }else{
                            data.active = false
                        }
                        address.push(data)
                    })
                    
                    this.setData({
                        address,
                        addressName:[],
                        crumbsLength:0
                    })
                })
            }else if(number === 1){
                let mtWharfList = addressName[index].mtWharfList;
                mtWharfList.forEach(data => {
                    if(data.id === addressName[number].id){
                        data.active = true
                    }else{
                        data.active = false
                    }
                })
                addressName.splice(2,1)
                addressName.splice(2,1)
                console.log(1231)
                this.setData({
                    address:mtWharfList,
                    addressName,
                    crumbsLength:addressName.length
                })
            }else if(number === 2){
                let mtWharfList = addressName[index].mtWharfList;
                mtWharfList.forEach(data => {
                    if(data.id === addressName[number].id){
                        data.active = true
                    }else{
                        data.active = false
                    }
                })
                addressName.splice(3,1)
                this.setData({
                    address:mtWharfList,
                    addressName,
                    crumbsLength:addressName.length
                })
                console.log(mtWharfList)
            }
            this.setData({
                cellValue:'请选择码头',
            })
        },

        bindleConfirm(){
            let detailedAddress = this.data.detailedAddress;
            let propID = this.data.propID;
            let wharfID = this.data.wharfID;
            let onMyEvent = {
                detailedAddress,
                propID,
                wharfID
            }
            this.triggerEvent('myevent',onMyEvent)

            if(detailedAddress != null){
                let pId = 0;
                let page = 1;
                let rows = 10;
                let sortInt = 1;
                let params = { pId,page,rows,sortInt };
                mtWharf.frontDeskWharfList(params).then(res => {
                    let rows = res.data.data.rows;
                    let address = [];
                    rows.forEach(data => {
                        data.active = false;
                        address.push(data)
                    });
                    this.setData({
                        address,
                        addressName:[],
                        crumbsLength:null,
                        cellValue:'请选择码头',
                        detailedAddress:null,
                        wharfID:null
                    })
                })
            }
        }
    }
})
