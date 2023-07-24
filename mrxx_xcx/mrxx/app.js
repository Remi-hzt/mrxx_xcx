//app.js

App({
  globalData: {
    userInfo: null,
    openid: "asd",

  },
  onLaunch: function () {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
     
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          //console.log(res.code)
          var appid = 'wxb8d32cb2c67b9e08'; //填写微信小程序appid  
          var secret = '85ec2cea15a53438280d78ae5033b48a'; //填写微信小程序secret         
          //调用request请求api转换登录凭证  
          var l = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + secret;
          wx.request({
            url: l,
            data: {},
            method: 'GET',
            success: function (res) {
              var obj = {};
              obj.access_token = res.data.access_token;
              console.log('access_token:' + obj.access_token);
              var access = obj.access_token;
            }
          });
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&grant_type=authorization_code&js_code=' + res.code,
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              that.globalData.openid= res.data.openid //获取openid  
              console.log(that.globalData.openid);
            }
          });       
      }
     
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

  },
  getInfo: function (words, cb) {
    const requestTask = wx.request({
      url: 'https://api.shanbay.com/bdc/search/',
      data: {
        word: words
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        cb(res.data);
      }
    })
  },
  getSen: function (wordsid, cb) {
    const requestTask = wx.request({
      url: 'https://api.shanbay.com/bdc/example/',
      data: {
        vocabulary_id: wordsid,
        "type": "sys"
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        cb(res.data);
      }
    })
  }

})