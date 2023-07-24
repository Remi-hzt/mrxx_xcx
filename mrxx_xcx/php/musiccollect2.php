<?php
//设置编码utf—8
header('Content-type:text/html;charset=utf-8');
//连接数据库
$con = new mysqli("localhost","root","xxx","test");
$musicid=$_GET["musicid"];
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
	$consql="select * from musiccollect where musicid='{$musicid}'and userid='{$useropen}';";
  $result=mysqli_query($con,$consql);
  $num = mysqli_fetch_array($result); 
	if(!$num){
	  $sql = "insert into musiccollect (musicid,userid) values ('{$musicid}','{$useropen}');";
	  //发送sql语句
	  $res = mysqli_query($con,$sql);
	  if($res){
		  $arr = 'add';
	  }else{
		  $arr = 'false';   
	  }
	 }
	else{
		$desql="delete from musiccollect where musicid='{$musicid}'and userid='{$useropen}';";
		$deres=mysqli_query($con,$desql);
		if($deres){
		$arr='delete';
		}
		else{
			$arr='false';
		}
	}
	echo ($arr);
	die;
	}
?>