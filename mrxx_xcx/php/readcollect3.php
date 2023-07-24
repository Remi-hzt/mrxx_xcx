<?php
//设置编码utf—8
header('Content-type:text/html;charset=utf-8');

//连接数据库
$con = new mysqli("localhost","root","xxx","test");
$openid=$_GET["openid"];
$reid = "";
if(!$con){
	echo "连接失败";
}
else{
	//定义sql语句
  $page = $_GET['page'];
	$count = $_GET['count'];
	$ind = ($page - 1) * $count;
  $sqlop="select id from usertable where openid='{$openid}';";
	$result = mysqli_query($con,$sqlop);
	$row = mysqli_fetch_array($result);
	$useropen=$row["id"];
    $sql = "select * from readcollect where userid=".$useropen;
	//发送sql语句
	$resul = $con->query($sql); 
  if ($resul->num_rows > 0) {
      // 输出数据
      while($userrow = $resul->fetch_assoc()) {
         if($reid=="")
         { 
            $reid = $userrow["readid"];
         }
         else{
            $reid =$reid."," .$userrow["readid"];
         }
      }
  } 
	$readsql= "select * from readtable where id in ({$reid}) order by id desc limit ".$ind.', '.$count;
  $resread = mysqli_query($con,$readsql);
	$data=$resread->fetch_all(PDO::FETCH_LAZY);
	echo json_encode($data);
}

?>