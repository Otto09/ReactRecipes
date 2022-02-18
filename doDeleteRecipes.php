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

$id = corectez($sir['id']);
settype($id, "integer");

$cda = "DELETE FROM recipes WHERE id = $id";
$raspuns = [];

if (mysqli_query($cnx, $cda)) {
    $raspuns[] = ['rezultat' => "OK"];
} else {
    $raspuns[] = ['rezultat' => 'Eroare: ' . mysqli_error($cnx)];
}
echo json_encode($raspuns);
?>