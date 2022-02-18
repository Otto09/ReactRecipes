<?php
require '../secret/conn_recipes.php';

function corectez($sir) {
  $sir = trim($sir);
  $sir = stripslashes($sir);
  $sir = htmlspecialchars($sir);
  return $sir;
}

$json = file_get_contents('php://input');
// The associative string $sir is created
$sir = json_decode($json, true); // JSON decoding

$id_recing = corectez($sir['id_recing']);
settype($id_recing, "integer");

$cda = "DELETE FROM recing WHERE id_recing = $id_recing";
$raspuns = [];

if (mysqli_query($cnx, $cda)) {
    $raspuns[] = ['rezultat' => "OK"];
} else {
    $raspuns[] = ['rezultat' => 'Eroare: ' . mysqli_error($cnx)];
}
echo json_encode($raspuns);
?>