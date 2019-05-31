<?php
//đăng kí
include('connect/connect.php');
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$name = $obj['name'];
$email = $obj['email'];
$password = md5($obj['password']);
$phone = $obj["phone"];
$address = $obj["address"];
if($name !='' && $email != '' && $password!='' && $phone != "" && $address != ""){
	
	$sql = "INSERT INTO users VALUES (null, '$email', '$password', '$name', '$phone', '$address')";
	$result = $mysqli->query($sql);
	if($result){
		echo 'THANH_CONG';
	}
	else{
		echo 'KHONG_THANH_CONG';
	}
}
else{
	echo 'KHONG_THANH_CONG';
}

?>
