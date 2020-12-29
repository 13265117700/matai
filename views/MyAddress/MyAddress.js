// views/MyAddress/MyAddress.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        buttonStyle:'border-top-left-radius: 10px;border-top-right-radius: 10px;',
    },
    onShow: function () {

    },
    handleAddButton(){
        wx.navigateTo({
          url: '/views/MyAddressAdd/MyAddressAdd',
        })
    }
})