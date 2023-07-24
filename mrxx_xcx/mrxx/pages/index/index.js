//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      console.log(app.globalData.userInfo);
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
   
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    wx.login({
      success: function (res) {
        wx.request({
          url: "http://xxx.xxx.xxx.xxx/userlogin.php",
          data: {
            'picture': e.detail.userInfo.avatarUrl,
            'name': e.detail.userInfo.nickName,
            'code': res.code
          },
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success:function(res){
            console.log(res.data);
            if (res.data == true) {            
              wx.showToast({
                title: '登录成功',
                duration: 2000
              });
              
            } else {
            
            }
          }             
        })
      }
    })              
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  collectPage:function(){
    wx.navigateTo({
      url: '/pages/collect/collect',

    })
  },

  musicPage:function(){
    wx.navigateTo({
      url: '/pages/musiccoll/musiccoll',

    })
  },
  videoPage: function () {
    wx.navigateTo({
      url: '/pages/videocoll/videocoll',

    })
  },
  
})