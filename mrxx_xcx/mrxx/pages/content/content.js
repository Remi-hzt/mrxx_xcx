// pages/content/content.js
var app = getApp();
var readid="";
var openid = "";
var readname="";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    readid=options.readid;
    app.onLaunch();
    openid = app.globalData.openid;
    showView: (options.showView == "true" ? true : false)
    wx.showLoading({
      title: '加载中',
      icon: 'loading',
      mask: true
    })
    wx.request({
      method: "GET",    //注意请求方式必须要大写！！！
      url: 'http://xxx.xxx.xxx.xxx/readcontent.php',//测试接口
      data:{
        readid:readid
      },
      header: { 'content-type': 'application/json' },  //content-type必须要小写！！！
      success: function (res) {
        console.log(res.data)
        that.setData({
          result: res.data,
          readname:res.data.bookname
        })
        wx.hideLoading();
        
      }
    })
    wx.request({
      method: "GET",
      url: 'http://xxx.xxx.xxx.xxx/readcollect.php',
      data: {
        readid: readid,
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
  onShareAppMessage: function (options) {
    var that = this;
    return {
      title: readname,
      path: '/pages/content/content?readid='+readid,
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

  onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },
  //点击收藏
  tapCollect: function (options){
    var that=this;
    console.log('shoc');
    app.onLaunch();
    openid = app.globalData.openid;
    showView: (options.showView == "true" ? true : false)
    wx.request({
      method: "GET",
      url: 'http://xxx.xxx.xxx.xxx/readcollect2.php',
      data: {
        readid: readid,
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
        else{
          console.log('失败')
        }
      }

    })
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