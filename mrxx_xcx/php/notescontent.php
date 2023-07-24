<?php
//设置编码utf—8
header('Content-type:text/html;charset=utf-8');
$notesid=$_GET["notesid"];
//连接数据库
$con = new mysqli("localhost","root","xxx","test");
if(!$con){
	echo "连接失败";
}
else{
	$sql= "select * from notestable where id='{$notesid}';";
    $res = mysqli_query($con,$sql);
	$data=$res->fetch_all(PDO::FETCH_LAZY);
	echo json_encode($data);
}

?>