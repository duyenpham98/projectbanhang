<?php

	include('connect/connect.php');
	$id_bill = $_GET['id_bill'];
	$products = $mysqli->query ("select bill_detail.id , bill_detail.quantity , bill_detail.price , product.name , product.color , product.material from bill_detail LEFT join product on product.id = bill_detail.id_product inner join bill ON bill.id = bill_detail.id_bill WHERE id_bill = $id_bill group by bill_detail.id");
	while ($row = $products->fetch_object()){
	    $product[] = $row;	
	}
	echo json_encode($product);
?>
	
