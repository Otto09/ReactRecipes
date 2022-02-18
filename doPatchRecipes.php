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
$recipe = corectez($sir['recipe']);
$image = corectez($sir['image']);
$id_category = corectez($sir['id_category']);
settype($id_category, "integer");
$preparation = corectez($sir['preparation']);
$duration = corectez($sir['duration']);
settype($duration, "integer");
$complexity = corectez($sir['complexity']);

$ingrediente = $sir['ingrediente'];

$length = count($ingrediente);

$raspuns = [];
$stmt = mysqli_prepare($cnx, "UPDATE recipes SET recipe=?, image=?, id_category=?, preparation=?, duration=?, complexity=? WHERE id=?;");
mysqli_stmt_bind_param($stmt, 'ssisisi', $recipe, $image, $id_category, $preparation, $duration, $complexity, $id);

if(mysqli_stmt_execute($stmt)) {
  $raspuns[] = ['rezultat' => "OK"];
} else {
  $raspuns[] = ['rezultat' => 'Eroare: ' . mysqli_error($cnx)];
}

$id_get = [];
$idhistory = [];

$cda = "SELECT id_recing FROM recing WHERE id_recipe=$id LIMIT 1;";
if ($rez = mysqli_query($cnx, $cda)) {
  // Take the line (ie id_recing)
  while ($row = mysqli_fetch_assoc($rez)) {
    $id_get[] = $row;
  }
  $id_recing = $id_get[0]['id_recing'];
}

$stmt_2 = mysqli_prepare($cnx, "UPDATE recing SET idingredient=?, amount=?  WHERE id_recing=?;");

mysqli_stmt_bind_param($stmt_2, 'idi', $idingredient, $amount, $id_recing);

for ($i = 0; $i < $length; $i++) {
  $idingredient = $ingrediente[$i]['idingredient'];
  $amount = $ingrediente[$i]['amount'];
  mysqli_stmt_execute($stmt_2);

  $id_recing += 1;
}

$raspuns[] = ['rezultat_2' => 'Eroare: ' . mysqli_error($cnx)];
$raspuns[] = ['rezultat_2' => 'id: ' . $id_recing];

echo json_encode($raspuns);

mysqli_stmt_close($stmt_2);
mysqli_stmt_close($stmt);
mysqli_close($cnx);

?>