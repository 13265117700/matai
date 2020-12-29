Component({
  properties: {
    list: {
      type: Array,
      value: []
    }
  },
  methods: {
    goPath(e) {
      const { path } = e.currentTarget.dataset
      if (path) {
        wx.navigateTo({
          url: path
        })
      }
    }
  }
})
