<?php
	 $target_dir = "images/product";
	 if(!file_exists($target_dir)){
	mkdir($target_dir , 8777,true);
	}
	$image = $_FILES['image']['tmp_name'];
	$target_dir = $target_dir . "/" . rand() . "_" . time() . ".jpeg";
	
	if(move_uploaded_file($image,$target_dir)){
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
?>
		
