<?php
//设置编码utf—8
header('Content-type:text/html;charset=utf-8');
//连接数据库
$con = new mysqli("localhost","root","xxx","test");
$openid=$_GET["openid"];
$title=$_GET["title"];
$date=$_GET["date"];
$node=$_GET["nodes"];
if(!$con){
	echo "连接失败";
}
else{

	//定义sql语句
  $sqlop="select id from usertable where openid='{$openid}';";
  $result = mysqli_query($con,$sqlop);
  $row = mysqli_fetch_array($result);
  $useropen=$row["id"];	
  $sql = "insert into notestable (title,note,date,openid) values ('{$title}','{$node}','{$date}','{$useropen}');";
	  //发送sql语句
	  $res = mysqli_query($con,$sql);
	  if($res){
		  $arr = 'add';
	  }else{
		  $arr = 'false';   
	  }
	echo ($arr);
	die;
	}
?>