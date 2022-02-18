<?php 
    require '../../safe_php/conn_recipes.php';

    //  Helper functions
    function executaGET($cnx) {
    	// I will return all the recipes. I declare the series of retete
 		$retete = [];

 		$cda = "SELECT recipes.id, recipes.recipe, recipes.image, recipes.id_category, recipes.preparation, recipes.duration, recipes.complexity FROM recipes";
 		if ($rez = mysqli_query($cnx,$cda)) {
        	// Take the lines (ie recipes) one at a time
 			while ($reteta = mysqli_fetch_assoc($rez)) {
            	$idreteta = $reteta['id'];
 				// Knowing $idreteta, I also take the ingredients
 				$cda_2 = "SELECT ingredients.ingredientName, recing.amount, ingredients.unit FROM recing INNER JOIN ingredients ON recing.idingredient = ingredients.idingredient WHERE recing.id_recipe = $idreteta";
 				if ($rez_2 = mysqli_query($cnx,$cda_2)) {
 					$ingred = [];
                    // Take the lines (ie ingredients) one at a time
 					while ($linie_2 = mysqli_fetch_assoc($rez_2)) {
 						$ingred[] = $linie_2;
 					}
					// I complete the current recipe (from $reteta) with another field, ingrediente.
                	// The ingrediente field receives as value the associative array $ingred.
 					$reteta['ingrediente'] = $ingred;
                    
 					// Add the current recipe in the $retete string
 					$retete[] = $reteta;
                    
 					// I release the memory occupied by the selection set
 					mysqli_free_result($rez_2);
 				}
 			}
 			// I release the memory occupied by the selection set $rez
 			mysqli_free_result($rez);
 		}
 		echo json_encode($retete); 
    }
    /*
    function executaPOST($cnx) {
        $sir = citeste();
        $recipe = $sir['recipe']; 
        $image = $sir['image']; 
        $id_category = $sir['id_category']; 
        $ingredientName = $sir['ingredientName'];
    	$unit = $sir['unit'];
    	$amount = $sir['amount'];
    	$preparation = $sir['preparation'];
		
        $raspuns = [];
        $stmt = mysqli_prepare($cnx, "INSERT INTO recipes(recipe, image, id_category, preparation) VALUES (?, ?, ?, ?)");
        mysqli_stmt_bind_param($stmt, 'ssis', $recipe, $image, $id_category, $preparation);
        
        if(mysqli_stmt_execute($stmt)) {
            $raspuns[] = ['rezultat' => "OK"];
            $raspuns[] = ['id' => mysqli_stmt_insert_id($stmt)];
        } else {
            $raspuns[] = ['rezultat' => 'Eroare: ' . mysqli_error($cnx)];
        }
    
    	$id_recipe = mysqli_stmt_insert_id($stmt)        
        echo json_encode($raspuns);
    	
    	
    	$raspuns_2 = [];
    	$stmt_2 = mysqli_prepare($cnx, "INSERT INTO ingredients(ingredientName, unit) VALUES (?, ?)");
        mysqli_stmt_bind_param($stmt_2, 'ss', $ingredientName, $unit);
    
    	if(mysqli_stmt_execute($stmt_2)) {
            $raspuns_2[] = ['rezultat' => "OK"];
            $raspuns_2[] = ['id' => mysqli_stmt_insert_id($stmt_2)];
        } else {
            $raspuns_2[] = ['rezultat' => 'Eroare: ' . mysqli_error($cnx)];
        }
    
    	$id_ingredient = mysqli_stmt_insert_id($stmt_2)
        echo json_encode($raspuns_2);
    
    	$raspuns_3 = [];
    	$stmt_3 = mysqli_prepare($cnx, "INSERT INTO recing(id_recipe, id_ingredient, amount) VALUES (?, ?, ?)");
        mysqli_stmt_bind_param($stmt_3, 'iid', $id_recipe, $id_ingredient, $amount);
    
    	if(mysqli_stmt_execute($stmt_3)) {
            $raspuns_3[] = ['rezultat' => "OK"];
            $raspuns_3[] = ['id' => mysqli_stmt_insert_id ($stmt_3)];
        } else {
            $raspuns_3[] = ['rezultat' => 'Eroare: ' . mysqli_error($cnx)];
        }
        echo json_encode($raspuns_3);
    }
    /*  
    function executaPATCH($cnx) {
        $sir = citeste();
        $id = $sir['id']; 
        $name = $sir['name']; 
        $image = $sir['image']; 
        $category = $sir['category']; 
        $ingredient = $sir['ingredient'];
        $amount = $sir['amount'];
    	$unit = $sir['unit'];
    	$preparation = $sir['preparation'];

        $raspuns = [];
        $stmt = mysqli_prepare($cnx, "update recipes SET name=?, image=?, category=?, ingredient=?, amount=?, unit=?, preparation=? WHERE id=?");
        mysqli_stmt_bind_param($stmt, 'ssssdssi', $name, $image, $category, $ingredient, $amount, $unit, $preparation, $id);
        if(mysqli_stmt_execute($stmt)) {
            $raspuns[] = ['rezultat' => "OK"];
        } else {
            $raspuns[] = ['rezultat' => 'Eroare: ' . mysqli_error($cnx)];
        }
        echo json_encode($raspuns);
    }

    function executaDELETE($cnx) {
        $sir = citeste();
        $id = $sir['id'];

        $cda = "DELETE FROM recipes WHERE id = $id";
        $raspuns = [];

        if (mysqli_query($cnx, $cda)) {
            $raspuns[] = ['rezultat' => "OK"];
        } else {
            $raspuns[] = ['rezultat' => 'Eroare: ' . mysqli_error($cnx)];
        }
        echo json_encode($raspuns);
    } 
	*/
    function citeste() {
        $json = file_get_contents('php://input');
        //Then the associative string $sir is created
        $sir = json_decode($json, true); // decodificare json
        // print_r($sir);
        return $sir;
    }
    
    $metoda = $_SERVER['REQUEST_METHOD'];
    switch ($metoda) {
        case 'GET':
            executaGET($cnx);  
            break;
        
        case 'POST':
            executaPOST($cnx);  
            break;
      
        case 'PATCH':
            executaPATCH($cnx);  
            break;

        case 'DELETE':
            executaDELETE($cnx);  
            break;
    }

    mysqli_close($cnx);
?>