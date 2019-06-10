<?php
	include('connect/connect.php');
	$key = "example_key";
	$json = file_get_contents('php://input');
	$obj = json_decode($json, true);
	$id    = $obj["id"];
	$name = $obj["name"];
	$id_type = $obj["id_type"];
	$price = $obj["price"];
	$color = $obj["color"];
	$material = $obj["material"];
	$description = $obj["description"];
	$news = $obj["news"];
	$inCollection = $obj["inCollection"];
if($name != "" && $id_type != "" && $price != "" && $color != "" && $material != "" && $description != ""&& $news != "" && $inCollection != "")	{
	$sql = "UPDATE product SET name='$name', id_type='$id_type',price='$price',
color='$color',material='$material',description='$description',news='$news',inCollection='$inCollection' WHERE id ='$id'";
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
