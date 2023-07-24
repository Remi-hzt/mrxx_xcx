Page({
  data: {
    categoryList: {
      pageone: [{
        name: "阅读",
        src: "/images/read.png",
        url: "/pages/read/read"
      }, {
        name: "音频",
        src: "/images/music.png",
        url: "/pages/music/music"
      }, {
        name: "视频",
        src: "/images/video.png",
        url: "/pages/video/video"
      }, {
        name: "单词查询",
        src: "/images/search.png",
        url: "/pages/word/word"
      }
      ]
    },
    carouselList: [],
    url: "",
    //当前机型
    IOS: true
  },
  //请求轮播图
  requestCarouselListData() {
    var that = this;//注意this指向性问题 
    wx.request({
      url: 'http://xxx.xxx.xxx.xxx/lbt.php',
      data: {//这里放请求参数，如果传入参数值不是String，会被转换成String 
        // x: '',
        // y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("轮播图返回值：");
        console.log(res.data);
        var resultArr = res.data;
        that.setData({
          carouselList: resultArr
        })
      }
    })
  },

  //点击了轮播图
  chomeCarouselClick: function (event) {
    var urlStr = event.currentTarget.dataset.url;
    console.log("点击了轮播图：" + urlStr);
    wx.navigateTo({
      url: urlStr
    })
  },
  onLoad:function(options){
    var that=this;
    this.requestCarouselListData();//请求轮播图
    wx.request({
      method: "GET",    //注意请求方式必须要大写！！！
      url: 'http://xxx.xxx.xxx.xxx/nodesxstop.php',//测试接口
      header: { 'content-type': 'application/json' },  //content-type必须要小写！！！
      success: function (res) {
        console.log(res.data)
        that.setData({
          contentlist: res.data       
        })
        wx.hideLoading();

      }
    })
  },

})