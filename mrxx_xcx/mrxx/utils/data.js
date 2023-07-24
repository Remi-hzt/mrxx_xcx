var data="";
export default  {
  request(promer, callBack) {  
    wx.request({
      method: "GET",    //注意请求方式必须要大写！！！
      url: 'http://106.12.15.55/weixin/music.php',//测试接口
      header: { 'content-type': 'application/json' },  //content-type必须要小写！！！
      success: function (res) {
        callBack(res.data)
        
      }
    })
  }
}
