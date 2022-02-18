<?php

require '../../safe_php/conn_recipes.php';

$categories = [];

$cda = "SELECT * FROM categories";
if ($rez = mysqli_query($cnx,$cda)) {
	// Take the lines (ie categories) one at a time
	while ($row = mysqli_fetch_assoc($rez)) {
		$categories[] = $row;
	}
	// I release the memory occupied by the selection set 
    mysqli_free_result($rez);
}
echo json_encode($categories);
?>