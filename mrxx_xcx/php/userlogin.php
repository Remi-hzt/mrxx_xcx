<?php
//设置编码utf—8
header('Content-type:text/html;charset=utf-8');
$code=$_GET["code"];
	$username=$_GET["name"];
	$picture=$_GET["picture"];
	$appid='wxb8d32cb2c67b9e08';//小程序appid
	$secret='85ec2cea15a53438280d78ae5033b48a';//小程序aposecret
   $url = 'https://api.weixin.qq.com/sns/jscode2session?appid=wxb8d32cb2c67b9e08&secret=85ec2cea15a53438280d78ae5033b48a&grant_type=authorization_code&js_code='.$code;
    $info = file_get_contents($url);//发送HTTPs请求并获取返回的数据，推荐使用curl
    $json = json_decode($info);//对json数据解码
    $arr = get_object_vars($json);
    $openid = $arr['openid'];
    $session_key = $arr['session_key'];
//连接数据库
$con = new mysqli("localhost","root","xxx","test");

if(!$con){
	echo "连接失败";
}
else{
	 $sql1 = "select * from usertable where openid = '$openid'";
            $result = mysqli_query($con, $sql1);
            $result = mysqli_fetch_assoc($result);
            if ($result!=null) {//如果数据库中存在此用户的信息，则不需要重新获取
                $result = json_encode($result);
                echo $result;}
	          //定义sql语句
            else{
	          $sql = "INSERT INTO usertable (username,picture,openid) values ('$username','$picture','$openid');";
	          //发送sql语句
	          $res = mysqli_query($con,$sql);
            if($res){
              $arr = 'true';
            }else{
	          $arr = 'false';   
            }
            echo ($arr);
             die;
          }
}
?>