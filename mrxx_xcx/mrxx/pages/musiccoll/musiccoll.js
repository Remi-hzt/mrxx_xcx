// pages/musiccoll/musiccoll.js
var app = getApp();
var openid = "";
var musicid = "";

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
    playStatus: true,
    audioIndex: 0,
    progress: 0,
    duration: 0,
    audioList: [],
    showList: true
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
      url: 'http://xxx.xxx.xxx.xxx/musiccollect3.php',	//本地设置不校验合法域名
      data: {
        page: that.data.page,
        count: that.data.pageSize,
        openid: openid
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
    that.getInfo('正在加载数据...');
    var that = this;
    app.onLaunch();
    openid = app.globalData.openid;
    wx.request({
      method: "GET",    //注意请求方式必须要大写！！！
      url: 'http://xxx.xxx.xxx.xxx/musiccollect3.php',//测试接口
      header: { 'content-type': 'application/json' }, //content-type必须要小写！！！
      data: {
        page: that.data.page,
        count: that.data.pageSize,
        openid: openid
      }, 
      success: function (res) {
        audioList: res.data;
        that.setData({
          audioList: res.data
        });

      }
    })

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
  playMusic: function () {
    let audio = this.data.audioList[this.data.audioIndex];
    let manager = wx.getBackgroundAudioManager();
    let that = this;
    app.onLaunch();
    openid = app.globalData.openid;
    manager.title = audio.name || "音频标题";
    manager.epname = audio.epname || "专辑名称";
    manager.singer = audio.author || "歌手名";
    manager.coverImgUrl = audio.poster;
    // 设置了 src 之后会自动播放
    manager.src = audio.src;
    manager.currentTime = 0;
    wx.request({
      method: "GET",
      url: 'http://xxx.xxx.xxx.xxx/musiccollect.php',
      data: {
        musicid: musicid,
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
    manager.onPlay(function () {
      console.log("======onPlay======");
      that.setData({
        playStatus: true
      })
      that.countTimeDown(that, manager);
    });
    manager.onPause(function () {
      that.setData({
        playStatus: false
      })
      console.log("======onPause======");
    });
    manager.onEnded(function () {
      console.log("======onEnded======");
      that.setData({
        playStatus: false
      })
      setTimeout(function () {
        that.nextMusic();
      }, 1500);
    });
  },

  //循环计时
  countTimeDown: function (that, manager, cancel) {
    if (that.data.playStatus) {
      setTimeout(function () {
        if (that.data.playStatus) {
          // console.log("duration: " + manager.duration);
          // console.log(manager.currentTime);
          that.setData({
            progress: Math.ceil(manager.currentTime),
            progressText: that.formatTime(Math.ceil(manager.currentTime)),
            duration: Math.ceil(manager.duration),
            durationText: that.formatTime(Math.ceil(manager.duration))
          })
          that.countTimeDown(that, manager);
        }
      }, 1000)
    }
  },

  //拖动事件
  sliderChange: function (e) {
    let manager = wx.getBackgroundAudioManager();
    manager.pause();
    manager.seek(e.detail.value);
    this.setData({
      progressText: this.formatTime(e.detail.value)
    })
    setTimeout(function () {
      manager.play();
    }, 1000);
  },

  //列表点击事件
  listClick: function (e) {
    let pos = e.currentTarget.dataset.pos;
    musicid = e.currentTarget.dataset.action;
    console.log(musicid);
    this.setData({
      audioIndex: pos,
      showList: false
    })
    this.playMusic();
  },

  //上一首
  lastMusic: function () {
    let audioIndex = this.data.audioIndex > 0 ? this.data.audioIndex - 1 : this.data.audioList.length - 1;
    this.setData({
      audioIndex: audioIndex,
      playStatus: false,
      progress: 0,
      progressText: "00:00",
      durationText: "00:00"
    })
    setTimeout(function () {
      this.playMusic();
    }.bind(this), 1000);
  },

  //播放按钮
  playOrpause: function () {
    let manager = wx.getBackgroundAudioManager();
    if (this.data.playStatus) {
      manager.pause();
    } else {
      manager.play();
    }
  },

  //下一首
  nextMusic: function () {
    let audioIndex = this.data.audioIndex < this.data.audioList.length - 1 ? this.data.audioIndex + 1 : 0;
    this.setData({
      audioIndex: audioIndex,
      playStatus: false,
      progress: 0,
      progressText: "00:00",
      durationText: "00:00"
    })
    setTimeout(function () {
      this.playMusic();
    }.bind(this), 1000);
  },

  //界面切换
  pageChange: function () {
    this.setData({
      showList: true
    })
  },

  //格式化时长
  formatTime: function (s) {
    let t = '';
    s = Math.floor(s);
    if (s > -1) {
      let min = Math.floor(s / 60) % 60;
      let sec = s % 60;
      if (min < 10) {
        t += "0";
      }
      t += min + ":";
      if (sec < 10) {
        t += "0";
      }
      t += sec;
    }
    return t;
  },
  tapCollect: function (options) {
    var that = this;
    console.log('shoc');
    app.onLaunch();
    openid = app.globalData.openid;
    showView: (options.showView == "true" ? true : false)
    wx.request({
      method: "GET",
      url: 'http://xxx.xxx.xxx.xxx/musiccollect2.php',
      data: {
        musicid: musicid,
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
  }
})