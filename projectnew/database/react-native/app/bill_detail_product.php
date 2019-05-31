<?php

	include('connect/connect.php');

	$sql = "select bill.id , bill_detail.quantity , bill_detail.price , product.name
from bill_detail LEFT join product on product.id = bill_detail.id_product inner join bill ON bill.id = bill_detail.id_bill;";
 
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
	
