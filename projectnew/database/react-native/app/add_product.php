<?php
	include('connect/connect.php');
	$json = file_get_contents('php://input');
	$obj = json_decode($json, true);
	$name = $obj["name"];
	$id_type = $obj["id_type"];
	$price = $obj["price"];
	$color = $obj["color"];
	$material = $obj["material"];
	$description = $obj["description"];
	$new = $obj["new"];
	
	$inCollection = $obj["inCollection"];
	if($name != "" && $id_type != "" && $price != "" && $color != "" && $material != "" && $description != "" && $new != "" && $inCollection != "")	{
	
	$sql = "INSERT INTO product VALUES (null, '$name', '$id_type', '$price', '$color', '$material' , '$description' , '$new' , '$inCollection')";
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
	$sql1 = "SELECT * FROM product ";
	$result1 = $mysqli->query($sql1);

?>
