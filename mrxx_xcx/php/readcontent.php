<?php
//设置编码utf—8
header('Content-type:text/html;charset=utf-8');

//连接数据库
$con = new mysqli("localhost","root","xxx","test");
$readid=$_GET["readid"];
if(!$con){
	echo "连接失败";
}
else{
	//定义sql语句
  
    $sql = "select * from readtable where id=".$readid;
	//发送sql语句
	$res = mysqli_query($con,$sql);
	$data=$res->fetch_all(PDO::FETCH_LAZY);
	echo json_encode($data);
}

?>