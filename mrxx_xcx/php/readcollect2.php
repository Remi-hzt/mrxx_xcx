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
	  $sql = "insert into readcollect (readid,userid) values ('{$readid}','{$useropen}');";
	  //发送sql语句
	  $res = mysqli_query($con,$sql);
	  if($res){
		  $arr = 'add';
	  }else{
		  $arr = 'infalse';   
	  }
	 }
	else{
		$desql="delete from readcollect where readid={$readid} and userid={$useropen};";
		$deres=mysqli_query($con,$desql);
		if($deres){
		$arr='delete';
		}
		else{
			$arr='defalse';
		}
	}
	echo ($arr);
	die;
	}
?>