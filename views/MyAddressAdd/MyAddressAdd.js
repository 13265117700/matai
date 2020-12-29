// views/MyAddressAdd/MyAddressAdd.js
Page({
    data: {
        buttonStyle:'border-radius:10px;',
        addInputList:[{
            title:'收件人',
            placeholder:'请输入收件人姓名',
            type:'input'
        },{
            title:'手机号码',
            placeholder:'请输入手机号码',
            type:'number'
        },{
            title:'地址',
            placeholder:'请选择详细地址',
            type:'default'
        },{
            title:'详细地址',
            placeholder:'请输入收货详细地址',
            type:'input'
        },{
            title:'设为默认地址',
            type:'i'
        }]
    },
    onLoad: function (options) {

    },

    onShow: function () {

    },
})