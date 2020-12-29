// pages/myFollow/myFollow.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        activeIndex:0,
        tabsList:[{
            id:1011001,
            title:'关注车辆',
        },{
            id:1011002,
            title:'关注船源',
        },{
            id:1011003,
            title:'关注货源',
        }],
        id:1011001,
    },

    onLoad: function (options) {

    },

    onShow: function () {
        if(typeof this.getTabBar === "function" && this.getTabBar()){
            this.getTabBar().setData({
                activeIndex:1
            })
        }
    },

    onClickTabs(e){
        console.log(e)
        let index = e.detail.index;
        let name = e.detail.name;
        let title = e.detail.title;
        this.setData({
            id:name
        })
        // let index = e.detail.index;
        // this.setData({
        //     activeIndex:index
        // })
    }
})