const app = getApp()
import design from '../../../data/design'
import video from '../../../data/video'
import photography from '../../../data/photography'
import ppt from '../../../data/ppt'

Component({
  properties: {
    isShow: {
      type: Boolean,
      value: false
    },
    info: {
      type: Object,
      value: {}
    }
  },
  observers: {
    info: function() {
      // editRange
      let text = ''
      let { info, design, video, photography, ppt } = this.data
      if (info.id) {
        let {workInformation, modifiableScope} = info
        switch(workInformation) {
          case 'design':
            text = design.editRange.find(item => item.id == modifiableScope)
            break;
          case 'video':
            text = video.editRange.find(item => item.id == modifiableScope)
            break;
          // case 'shoot': // 摄影没有修改范围
          //   text = photography.editRange.find(item => item.id == modifiableScope)
          //   break;
          case 'ppt':
            text = ppt.editRange.find(item => item.id == modifiableScope)
            break
        }

        this.setData({
          text: text.name
        })
      }
    }
  },

  data: {
    propHeight: 0,
    height: 500,
    swiperHeight: 0,
    text: '',
    modeList: [{
        id: 1,
        name: "共享图"
      },
      {
        id: 2,
        name: "原创共享图"
      },
      {
        id: 3,
        name: "原创商业出售"
      },
      {
        id: 4,
        name: "原创非商业出售"
      },
      {
        id: 5,
        name: "版权买断"
      }, // copyrightBuyoutPrice
    ],
    text: '', //可修改范围
    years: 1,
    types: 1,
    design: design,
    video: video,
    photography: photography,
    ppt: ppt,
  },
  lifetimes: {
    attached: function () {
      wx.getSystemInfo({
        success: (result) => {
          let {
            windowHeight
          } = result
          this.setData({
            height: windowHeight - 100,
            propHeight: windowHeight - 100,
            swiperHeight: windowHeight - 158
          })
        },
      })
    }
  },
  methods: {
    scrollToTop() {
      this.setAction({
        scrollTop: 0
      })
    },
    send() {
      let {
        text
      } = this.data
      if (!text.trim()) {
        return
      }
      this.triggerEvent('send', text)
      this.setData({
        text: ''
      })
    },
    notDo() {
      return false
    },
    close() {
      this.triggerEvent('close', true)
    },
    confirm() {
      let {
        years,
        types,
        info
      } = this.data
      if (info.typesWorks == 5) {
        years = 999
      }
      let params = {
        years,
        types
      }
      this.triggerEvent('confirm', params)
    },


    manasu() {
      let {
        years
      } = this.data
      if (years == 1) {
        return
      }
      this.setData({
        years: --years
      })
    },
    plus() {
      let {
        years
      } = this.data
      if (years == 5) {
        return
      }
      this.setData({
        years: ++years
      })
    },
    typesChange(e) {
      let {
        index
      } = e.currentTarget.dataset
      this.setData({
        types: index
      })
    }
  }
})