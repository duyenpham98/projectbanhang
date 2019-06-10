<?php
	include('connect/connect.php');
	//include('update_product.php');
	$target_dir = "images/product";
	$json = file_get_contents('php://input');
	$obj = json_decode($json, true);
	$id    = $obj["id"];
	 if(!file_exists($target_dir)){
	mkdir($target_dir , 8777,true);
	}
	$time =  time() . ".jpeg";
	$target_dirs = $target_dir . "/" . $time;
	if(move_uploaded_file($_FILES['image']['tmp_name'],$target_dirs)){
		
		echo json_encode([
		"Message" => "The file has been uploaded.",
		"Status" => "Ok."
		
	]);
	}else{
	echo json_encode([
		"Message" => "Sorry, there was an error uploading your file.",
		"Status" => "Error."
	]);
	}
	$sql1 = "UPDATE images SET link = '$time' WHERE id_product ='$id'";
	$result1 = $mysqli->query($sql1);
?>
