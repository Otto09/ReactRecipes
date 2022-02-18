<?php
require '../../safe_php/conn_recipes.php';

function corectez($sir) {
  $sir = trim($sir);
  $sir = stripslashes($sir);
  $sir = htmlspecialchars($sir);
  return $sir;
}

$json = file_get_contents('php://input');
// The associative string $sir is created
$sir = json_decode($json, true); // JSON decoding

$recipe = corectez($sir['recipe']);
$image = corectez($sir['image']);
$id_category = $sir['id_category'];
settype($id_category, "integer");
$duration = corectez($sir['duration']);
settype($duration, "integer");
$complexity = corectez($sir['complexity']);
$preparation = corectez($sir['preparation']);
$ingrediente = $sir['ingrediente'];

$length = count($ingrediente);

$raspuns = [];
$stmt = mysqli_prepare($cnx, "INSERT INTO recipes (recipe, image, preparation, duration, complexity, id_category) SELECT ?, ?, ?, ?, ?, categories.id_category FROM categories WHERE categories.id_category = $id_category;");
mysqli_stmt_bind_param($stmt, 'sssis', $recipe, $image, $preparation, $duration, $complexity);

if(mysqli_stmt_execute($stmt)) {
	$raspuns[] = ['rezultat' => "OK"];
	$raspuns[] = ['id' => mysqli_stmt_insert_id($stmt)];
} else {
	$raspuns[] = ['rezultat' => 'Eroare: ' . mysqli_error($cnx)];
}

$id_recipe = mysqli_stmt_insert_id($stmt);

$raspuns_2 = [];                                                                                                                                                                                                        
$stmt_2 = mysqli_prepare($cnx, "INSERT INTO recing (id_recipe, idingredient, amount) VALUES (?, ?, ?);");

for ($i = 0; $i < $length; $i++) {
	mysqli_stmt_bind_param($stmt_2, 'iid', $id_recipe, $ingrediente[$i]['idingredient'], $ingrediente[$i]['amount']);
	mysqli_stmt_execute($stmt_2);
};

$raspuns[] = ['rezultat_2' => 'Eroare: ' . mysqli_error($cnx)];

echo json_encode($raspuns);

mysqli_stmt_close($stmt_2);
mysqli_stmt_close($stmt);
mysqli_close($cnx);

?>
