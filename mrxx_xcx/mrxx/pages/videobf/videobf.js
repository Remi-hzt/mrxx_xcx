// pages/videobf/videobf.js
var videoid="";
var app = getApp();
var openid = "";
var videoname="";
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    app.onLaunch();
    openid = app.globalData.openid;
    videoid=options.videoid;
    wx.showLoading({
      title: '加载中',
      icon: 'loading',
      mask: true
    })
    wx.request({
      method: "GET",    //注意请求方式必须要大写！！！
      url: 'http://xxx.xxx.xxx.xxx/videocontent.php',//测试接口
      data: {
        videoid: videoid
      },
      header: { 'content-type': 'application/json' },  //content-type必须要小写！！！
      success: function (res) {
        console.log(res.data)
        that.setData({
          result: res.data,
          videoname:res.data.name
        })
        wx.hideLoading();

      }
    })
    wx.request({
      method: "GET",
      url: 'http://xxx.xxx.xxx.xxx/videocollect.php',
      data: {
        videoid: videoid,
        openid: openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data != 'erro') {
          console.log('未收藏');
          that.setData({
            collect_star: 'sc1.png',
            collect: 'isCollect'
          });


        } else {
          console.log('收藏')
          that.setData({
            collect_star: 'sc.png',
            collect: ''
          });
        }
      }

    })
  },
  //点击收藏
  tapCollect: function (options) {
    var that = this;
    showView: (options.showView == "true" ? true : false)
    wx.request({
      method: "GET",
      url: 'http://xxx.xxx.xxx.xxx/videocollect2.php',
      data: {
        videoid: videoid,
        openid: openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data == 'add') {
          console.log('进行收藏');
          wx.showToast({
            title: '收藏成功',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            collect_star: 'sc.png',
            collect: 'isCollect'
          });

        } else if (res.data == 'delete') {
          wx.showToast({
            title: '取消收藏',
            icon: 'success',
            duration: 2000
          })
          console.log('取消收藏')
          that.setData({
            collect_star: 'sc1.png',
            collect: ''
          });

        }
        else {
          console.log('失败')
        }
      }

    })
  },
  onShareAppMessage: function (options) {
    var that = this;
    return {
      title: videoname,
      path: '/pages/videobf/videobf?videoid=' + videoid,
      imageUrl: '/images/fenxiang.png',
      success: function (options) {
        if (options.shareTickets) {
          wx.showToast({
            title: '已经分享到群',
          });
        } else {
          wx.showToast({
            title: '请分享到群',
          });
        }
      },
      fail: function (options) {
        that.setData({
          msg: JSON.stringify(options)
        });
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})