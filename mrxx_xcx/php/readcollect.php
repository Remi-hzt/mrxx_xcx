<?php
//设置编码utf—8
header('Content-type:text/html;charset=utf-8');
//连接数据库
$con = new mysqli("localhost","root","xxx","test");
$readid=$_GET["readid"];
$openid=$_GET["openid"];
if(!$con){
	echo "连接失败";
}
else{

	//定义sql语句
	$sqlop="select id from usertable where openid='{$openid}';";
  $result = mysqli_query($con,$sqlop);
  $row = mysqli_fetch_array($result);
  $useropen=$row["id"];
	$consql="select * from readcollect where readid='{$readid}'and userid='{$useropen}';";
  $result=mysqli_query($con,$consql);
  $num = mysqli_fetch_array($result); 
	if(!$num){
	 $arr='ture';
	 }
	else{
		$arr='erro';
	}
	echo ($arr);
	die;
	}
?>