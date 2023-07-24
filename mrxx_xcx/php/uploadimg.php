<?php
date_default_timezone_set("Asia/Shanghai"); //设置时区
$code = $_FILES['file'];//获取小程序传来的图片

if(is_uploaded_file($_FILES['file']['tmp_name'])) {  
    //把文件转存到你希望的目录（不要使用copy函数）  
    $uploaded_file=$_FILES['file']['tmp_name'];  
    $username = "min_img";
    //我们给每个用户动态的创建一个文件夹  
    $user_path=$_SERVER['DOCUMENT_ROOT']."/weixin"."/images";
     
    //判断该用户文件夹是否已经有这个文件夹  
    if(!file_exists($user_path)) { 
        mkdir($user_path,0777,true);
    }  
 
    //$move_to_file=$user_path."/".$_FILES['file']['name'];  
    $file_true_name=$_FILES['file']['name']; 
    $filename1=time().rand(1,1000)."-".date("Y-m-d").substr($file_true_name,strrpos($file_true_name,"."));//strrops($file_true,".")查找“.”在字符串中最后一次出现的位置  
    $move_to_file=$user_path."/".$filename1;
    //echo "$uploaded_file   $move_to_file";  
    if(move_uploaded_file($uploaded_file,iconv("utf-8","gb2312",$move_to_file))) {  
        echo "/images/".$filename1; 
 
    } else {  
        echo "上传失败".date("Y-m-d H:i:sa"); 
 
    }  
} else {  
    echo "上传失败".date("Y-m-d H:i:sa");  
}  
?>