// pages/bijiqw/bijiqw.js
var notesid = "";
var app = getApp();
var openid = "";
var notesname = "";
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
    var that = this;
    app.onLaunch();
    openid = app.globalData.openid;
    notesid = options.notesid;
    wx.showLoading({
      title: '加载中',
      icon: 'loading',
      mask: true
    })
    wx.request({
      method: "GET",    //注意请求方式必须要大写！！！
      url: 'http://xxx.xxx.xxx.xxx/notescontent.php',//测试接口
      data: {
        notesid: notesid
      },
      header: { 'content-type': 'application/json' },  //content-type必须要小写！！！
      success: function (res) {
        console.log(res.data)
        that.setData({
          result: res.data,
          notesname: res.data.title
        })
        wx.hideLoading();

      }
    })
  },
  
  onShareAppMessage: function (options) {
    var that = this;
    return {
      title: notesname,
      path: '/pages/bijiqw/bijiqw?notesid=' + notesid,
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