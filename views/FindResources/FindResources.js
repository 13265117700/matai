// views/FindResources/FindResources.js
Page({
    data: {
        id:null,
        pageState:null,
        navbarTitle:'',
        idenID:null,
    },
    onLoad: function (options) {
        console.log(options)
        this.setData({
            id:options.id,
            pageState:options.data,
            idenID:options.idenID
        })
    },
    onShow: function () {
        this.navbarTitle()
        this.handlePage()
    },

    navbarTitle(){
        let id = this.data.id;
        let pageState = this.data.pageState;
        if(pageState){
            switch(id){
                case '9999999':
                    this.setData({
                        navbarTitle:'船期船源信息'
                    })
                    break
                case '9999998':
                    this.setData({
                        navbarTitle:'货源货期信息'
                    })
                    break
                case '9999997':
                    this.setData({
                        navbarTitle:'货源货期信息'
                    })
                    break
                case '9999996':
                    this.setData({
                        navbarTitle:'车源车期信息'
                    })
                    break
            }
        }else{
            this.setData({
                navbarTitle:'船期信息'
            })
        }
    },

    handlePage(){
        console.log(this.data.id)
        console.log(this.data.pageState)
    }
})