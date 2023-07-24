<?php
//设置编码utf—8
header('Content-type:text/html;charset=utf-8');
// 字符串截取，多余用"..."代替
function cut_str($str, $chang){
	$len = mb_strlen($str, 'utf-8');
	if($len > $chang){
		return mb_substr($str, 0, $chang, 'utf-8').'...';
	}else{
		return $str;
	}
}	
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
	$sql = "select * from readtable order by id desc limit ".$ind.', '.$count;
	$res = mysqli_query($con,$sql);
	//发送sql语句	
	$data=$res->fetch_all(PDO::FETCH_LAZY);
	echo json_encode($data);
}

?>