var that;
var app = getApp();
var openid = "";
var imgdata="";
var util = require('../../utils/util.js');
Page({
  data: {
    content: '',
    content_html: '',
    formats: {},
    readOnly: false,
    placeholder: '开始输入...',
    editorHeight: 300,
    keyboardHeight: 0,
    isIOS: false
  },
  onEditorReady() {
    // 输入~编辑框
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context;
      console.log("初始化成功：" + wx.getStorageSync("content"))
      if (wx.getStorageSync("content")) { // 设置~历史值
        that.editorCtx.insertText(wx.getStorageSync("content")) // 注意：插入的是对象
      }
    }).exec()

  },
  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },
  onLoad() {
    that=this;
    const platform = wx.getSystemInfoSync().platform
    const isIOS = platform === 'ios'
    this.setData({ isIOS })
    this.updatePosition(0)
    let keyboardHeight = 0
    wx.onKeyboardHeightChange(res => {
      if (res.height === keyboardHeight) return
      const duration = res.height > 0 ? res.duration * 1000 : 0
      keyboardHeight = res.height
      setTimeout(() => {
        wx.pageScrollTo({
          scrollTop: 0,
          success() {
            that.updatePosition(keyboardHeight)
            that.editorCtx.scrollIntoView()
          }
        })
      }, duration)

    })
  },
  updatePosition(keyboardHeight) {
    const toolbarHeight = 80
    const { windowHeight, platform } = wx.getSystemInfoSync()
    let editorHeight = keyboardHeight > 0 ? (windowHeight - keyboardHeight - toolbarHeight) : windowHeight
    this.setData({ editorHeight, keyboardHeight })
  },
  calNavigationBarAndStatusBar() {
    const systemInfo = wx.getSystemInfoSync()
    const { statusBarHeight, platform } = systemInfo
    const isIOS = platform === 'ios'
    const navigationBarHeight = isIOS ? 44 : 48
    return statusBarHeight + navigationBarHeight
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
    }).exec()
  },
  blur() {
    this.editorCtx.blur()
  },
  format(e) {
    let { name, value } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    this.editorCtx.format(name, value)

  },
  onStatusChange(e) {
    const formats = e.detail
    this.setData({ formats })
  },
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function () {
        console.log('insert divider success')
      }
    })
  },
  clear() {
    this.editorCtx.clear({
      success: function (res) {
        console.log("clear success")
      }
    })
  },
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },
  insertImage() {
    const that = this
   
    wx.chooseImage({
      count: 1,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths[0];
        console.log(tempFilePaths);
        wx.uploadFile({
          url: 'http://xxx.xxx.xxx.xxx/uploadimg.php', //仅为示例，非真实的接口地址
          filePath: tempFilePaths,
          name: 'file',       
          success: function (res) {
            imgdata = res.data
            that.editorCtx.insertImage({
              src: "http://106.12.15.55" + imgdata,
              data: {
                id: 'abcd',
                role: 'god'
              },
              width: '80%',
              success: function () {
                console.log('insert image success')
              }
            })
          }
        })
          },
          fail: function (error) {
            console.log(error)
          }
        })
        
  },
  onContentChange(e) {
    console.log(e.detail);
    that.setData({
      content: e.detail,
    })
    wx.setStorageSync("content", e.detail)
  },
  clickShowText(e) {
    
  },
  onContentChange(e) {
   
    that.setData({
      content: e.detail,
    })
    wx.setStorageSync("content", e.detail)
  },
  formSubmit: function (e) {
    app.onLaunch();
    openid = app.globalData.openid;
    var datetime = util.formatTime(new Date());
    wx.request({
      url: "http://xxx.xxx.xxx.xxx/notes.php",
      data: {
        'title': e.detail.value.name,
        'nodes': that.data.content.html,
        'openid':openid,
        'date':datetime
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        if (res.data == 'add') {
          wx.showToast({
            title: '提交成功',
            duration: 2000
          });
        } else {
          wx.showToast({
            title: '提交失败',
            duration: 2000
          });
        }
      },
    })
  }
})
