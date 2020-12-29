// views/MyFriend/MyFriend.js
Page({
    data: {
        activeIndex:0,
        tabBar:[
            {
                tips:'chat',
                name:'聊天',
                large:false,
                icon:{
                    normal:'/images/my/MyFriend/tx@3x.png',
                    active:'/images/my/MyFriend/tx1@3x.png'
                }
            },
            {
                tips:'friend',
                name:'通讯录',
                large:false,
                icon:{
                    normal:'/images/my/MyFriend/lt@3x.png',
                    active:'/images/my/MyFriend/lt1@3x.png'
                }
            }
        ]
    },
    onShow: function () {
        
    },
    handleClickTabbar(e){
        console.log(e)
        let index = e.currentTarget.dataset.index;
        this.setData({
            activeIndex:index
        })
        console.log(this.data.activeIndex)
        let activeIndex = this.data.activeIndex;
        if(activeIndex === 0){
            console.log(11111)
        }else{
            console.log(2222)
        }
    },
})