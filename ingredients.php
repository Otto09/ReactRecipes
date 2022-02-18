<?php

require '../../safe_php/conn_recipes.php';

$ingredients = [];

$cda = "SELECT * FROM ingredients";
if ($rez = mysqli_query($cnx,$cda)) {
	// Take the lines (ie ingredients) one at a time
	while ($row = mysqli_fetch_assoc($rez)) {
		$ingredients[] = $row;
	}
	// I release the memory occupied by the selection set 
    mysqli_free_result($rez);
}
echo json_encode($ingredients);
?>