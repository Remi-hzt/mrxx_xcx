var app = getApp();
var openid = "";
Page({
  data: {
    avatarUrl: null
  },
  //事件处理函数
  bindViewTap: function () {
    var that = this;
    app.onLaunch();
    openid = app.globalData.openid;
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);
        wx.uploadFile({
          url: 'http://xxx.xxx.xxx.xxx/uploadimg.php', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          success: function (res) {
            var data = res.data
            console.log(data)
          },
          fail: function (error) {
            console.log(error)
          }
        })
      }
    })
  },

  preview_img: function () {
    wx.previewImage({
      current: this.data.avatarUrl, // 当前显示图片的http链接
      urls: this.data.avatarUrl // 需要预览的图片http链接列表
    })
  }
})