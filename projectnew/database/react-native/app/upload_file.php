<?php
	include('connect/connect.php');
	$target_dir = "images/product";
	 if(!file_exists($target_dir)){
	mkdir($target_dir , 8777,true);
	}
	$time =  rand() . "_" . time() . ".jpeg";
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
	
	$result =$mysqli->query("SELECT MAX(id) FROM product");
	if ($result){
		while($row = $result->fetch_array()) {
			$cur_auto_id = $row['MAX(id)'] ;
		}
	}else {
		// Code xử lý lỗi
		echo "Xảy ra lỗi khi truy vấn dữ liệu";
	}	
		
	$sql1 = "INSERT INTO images VALUES (null,'$time', $cur_auto_id)";
	$result1 = $mysqli->query($sql1);
		
?>