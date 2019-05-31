<?php

	include('connect/connect.php');

	$sql = "select bill.id , bill.date_order , bill.total , users.name , users.phone , users.address 
from users LEFT join bill on users.id = bill.id_customer;";
 
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
	
