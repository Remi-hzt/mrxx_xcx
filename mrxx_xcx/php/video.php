<?php
//设置编码utf—8
header('Content-type:text/html;charset=utf-8');

//连接数据库
$con = new mysqli("localhost","root","xxx","test");
if(!$con){
	echo "连接失败";
}
else{
	//定义sql语句
  $page = $_GET['page'];
	$count = $_GET['count'];
	$ind = ($page - 1) * $count;
    $sql = "select * from videotable order by id desc limit ".$ind.', '.$count;
	//发送sql语句
	$res = mysqli_query($con,$sql);
	$data=$res->fetch_all(PDO::FETCH_LAZY);
	echo json_encode($data);
}

?>