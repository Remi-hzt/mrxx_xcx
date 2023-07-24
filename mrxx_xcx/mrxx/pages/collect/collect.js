// pages/collect/collect.js
var app = getApp();
var openid = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,									//隐藏表单控件
    page: 1,										//当前请求数据是第几页
    pageSize: 10,									//每页数据条数
    hasMoreData: true,								//上拉时是否继续请求数据，即是否还有更多数据
    contentlist: [],								//获取的数据列表，以追加的形式添加进去
  },
  // 获取分页列表
  getInfo: function (message) {
    var that = this;
    app.onLaunch();
    openid = app.globalData.openid;
    wx.showNavigationBarLoading()					//在当前页面显示导航条加载动画
    wx.showLoading({								//显示 loading 提示框
      title: message,
    })
    wx.request({
      url: 'http://xxx.xxx.xxx.xxx/readcollect3.php',	//本地设置不校验合法域名
      data: { 
        page: that.data.page, 
        count: that.data.pageSize ,
        openid:openid
      },
      method: "GET",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        var contentlistTem = that.data.contentlist;
        if (res.data.length > 0) {
          wx.hideNavigationBarLoading()		//在当前页面隐藏导航条加载动画
          wx.hideLoading()					//隐藏 loading 提示框
          if (that.data.page == 1) {
            contentlistTem = []
          }
          var contentlist = res.data;
          if (contentlist.length < that.data.pageSize) {
            that.setData({
              contentlist: contentlistTem.concat(contentlist),
              hasMoreData: false
            })
          } else {
            that.setData({
              contentlist: contentlistTem.concat(contentlist),
              hasMoreData: true,
              page: that.data.page + 1
            })
          }
        }
      },
      fail: function (res) {
        wx.hideNavigationBarLoading()
        wx.hideLoading()
        fail()
      },
      complete: function (res) {

      },
    })
  },

  /**
  * 生命周期函数--监听页面初次渲染完成
  */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    that.getInfo('正在加载数据...')

  },

  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    this.data.page = 1
    this.getInfo('正在刷新数据')
  },

  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    if (this.data.hasMoreData) {
      this.getInfo('加载更多数据')
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
  },

})