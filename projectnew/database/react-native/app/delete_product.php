<?php
	include('connect/connect.php');
	$json = file_get_contents("php://input");
	$obj = json_decode($json,true);
	$id    = $obj["id"];
	$sql1 = "DELETE FROM images WHERE id_product = '$id'";
 
	$result = $mysqli->query($sql1);

	$sql = "DELETE FROM product WHERE id= '$id'";

	 if ($mysqli->query($sql) === TRUE) {
	    echo "Dữ liệu đã được xóa";
	} else {
	    echo "Lỗi delete: " . $mysqli->error;
	}
	$mysqli->close();
?>
	
