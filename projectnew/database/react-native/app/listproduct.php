<?php

	include('connect/connect.php');
	$sql = "select product.id, images.link , product.name , product.color,product.id_type, product.price,product.material,product.description,product.news,product.inCollection
from product
inner join images on product.id = images.id_product;";
 
	$result = $mysqli->query($sql);

	if ($result->num_rows >0) { 

	while($row[] = $result->fetch_assoc()) {

	$tempt = $row;

	$json = json_encode($tempt);


	}

	} else {
	echo "No Results Found.";
	}

	echo $json;
	
	$mysqli->close();
?>
	
