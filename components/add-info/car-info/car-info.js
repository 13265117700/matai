// components/my/user-admin/car-info/car-info.js
import upload from "../../../models/upload/upload";
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
        //信息组1
        infoOneList:[{
            title:'车牌照号：',
            placeholder:'请输入车辆牌照号'
        },{
            title:'车辆颜色代码:',
            placeholder:'请输入车辆颜色代码'
        },{
            title:'车辆类型代码:',
            placeholder:'请输入车辆类型代码'
        }],
        //信息组2
        infoTwoList:[{
            title:'所有人姓名：',
            placeholder:'请输入所有人姓名'
        },{
            title:'使用性质:',
            placeholder:'请输入使用性质'
        },{
            title:'车辆识别代码:',
            placeholder:'请输入车辆识别代码'
        },{
            title:'发证机关:',
            placeholder:'请输入发证机关'
        },{
            title:'注册时间:',
            placeholder:'请输入注册时间'
        },{
            title:'发证日期:',
            placeholder:'请输入发证日期'
        },{
            title:'车辆能源类型:',
            placeholder:'请输入车辆能源类型'
        }],
        // 信息组3
        infoThreeList:[{
            title:'核定载质量：',
            placeholder:'请输入核定载质量'
        },{
            title:'吨数:',
            placeholder:'请输入吨数'
        },{
            title:'挂车牌照号:',
            placeholder:'请输入挂车牌照号'
        },{
            title:'挂靠实际承运人:',
            placeholder:'请输入挂靠实际承运人'
        }],
        //信息组4
        infoFourList:[{
            title:'运输产生安全事故-是否发生:',
            type:'default',
            radio: '1',
        },{
            title:'运输产生安全事故-是否处理完成:',
            type:'default',
            radio: '1',
        },{
            title:'保险赔付-是否发生赔付:',
            type:'default',
            radio: '1',
        },{
            title:'保险赔付-赔付金额:',
            type:'default',
            radio: '1',
        },{
            title:'服务质量投诉-是否发生:',
            type:'default',
            radio: '1',
        },{
            title:'服务质量投诉-是否处理完成:',
            type:'default',
            radio: '1',
        }],

        imageList:[],
        videoFile:'',
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 信息分组1
        infoGroupOneInput(e){
            console.log(e,'分组1')
        },
        infoGroupTwoInput(e){
            console.log(e,'分组2')
        },
        infoGroupThreeInput(e){
            console.log(e,'分组3')
        },
        infoGroupFourRadio(event) {
            console.log(event,'分组4单选')
        },
        infoGroupFourInput(e){
            console.log(e,'分组4的Input')
        },
        handImagetUpload(event){
            const { file } = event.detail;
            let filePath = file.url;
            upload.upload.uploadFile(filePath).then(res => {
                let imageList = this.data.imageList;
                imageList.push({url:res})
                this.setData({
                    imageList
                })
            })
        },
        handleVideo(){
            upload.upload.chooseVideo().then(res => {
                this.setData({
                    videoFile:res
                })
            })
        },
        handleAnimalChange({ detail = {} }) {
            this.setData({
                checked: detail.current
            });
            console.log(this.data.checked)
        },
    }
})
