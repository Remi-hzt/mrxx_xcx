var app = getApp();
var musicid = "";
var openid = "";
var musicname="";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playStatus: true,
    audioIndex: 0,
    progress: 0,
    duration: 0,
    audioList: [],
    showList: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;   
    app.onLaunch();
    openid = app.globalData.openid;
    wx.request({
      method: "GET",    //注意请求方式必须要大写！！！
      url: 'http://xxx.xxx.xxx.xxx/music.php',//测试接口
      header: { 'content-type': 'application/json' },  //content-type必须要小写！！！
      success: function (res) {
        audioList:res.data;
        that.setData({
          audioList: res.data
        });
        
      }
    })
    
   
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
    musicname = audio.name,
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
  },
  onShareAppMessage: function (options) {
    var that = this;
    return {
      title: musicname,
      path: '/pages/music/music',
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