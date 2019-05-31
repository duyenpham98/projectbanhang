<?php
//collection
	include('connect/connect.php');
	$collection = $mysqli->query("SELECT p.*, GROUP_CONCAT(i.link) AS images FROM images i inner join product p ON i.id_product = p.id where inCollection=1  group by p.id  ");
	
	while ($row = $collection->fetch_object()){
		$assignees = explode(',', $row->images);
		$row->images = $assignees;
	    $product[] = $row;
	}

	echo (json_encode($product));
	
?>
