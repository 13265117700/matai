// custom-tab-bar/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        activeIndex:0,
        tabBar:[
            {
                pagePath:'/pages/index/index',
                name:'首页',
                tips:'',
                large:false,
                icon:{
                    normal:'/images/index/index1-3.png',
                    active:'/images/index/index2-3.png'
                }
            },
            {
                pagePath:'/pages/myFollow/myFollow',
                name:'我的关注',
                tips:'',
                large:false,
                icon:{
                    normal:'/images/myFollow/myFollow1-3.png',
                    active:'/images/myFollow/myFollow2-3.png'
                }
            },
            {
                pagePath:'/pages/deliver/deliver',
                name:'发布',
                tips:'',
                large:true,
                icon:{
                    normal:'/images/deliver/deliver.png',
                    active:'/images/deliver/deliver.png'
                }
            },
            {
                pagePath:'/pages/order/order',
                name:'订单',
                tips:'',
                large:false,
                icon:{
                    normal:'/images/order/order1-3.png',
                    active:'/images/order/order2-3.png'
                }
            },
            {
                pagePath:'/pages/my/my',
                name:'我的',
                tips:'',
                large:false,
                icon:{
                    normal:'/images/my/my1-3.png',
                    active:'/images/my/my2-3.png'
                }
            }
        ]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onChange(e){
            let index = e.detail.current;
            wx.switchTab({
              url: this.data.tabBar[index].pagePath,
            })
        },
        // init() {
        //     const page = getCurrentPages().pop();
        //     console.log(page.route)
        //     this.setData({
        //         activeIndex:this.data.tabBar.findIndex(item => item.pagePath === `/${page.route}`)
        //     })
        // }
    }
})
