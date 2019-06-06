<?php
	include('connect/connect.php');
	$json = file_get_contents("php://input");
	$obj = json_decode($json,true);
	$id    = $obj["id"];
	$sql1 = "DELETE FROM bill_detail WHERE id = '$id'";
 
	$result = $mysqli->query($sql1);

	 if ($mysqli->query($sql1) === TRUE) {
	    echo "Dữ liệu đã được xóa";
	} else {
	    echo "Lỗi delete: " . $mysqli->error;
	}
	$mysqli->close();
?>
	
