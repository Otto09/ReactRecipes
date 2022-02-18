import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import Recipe_cards from "./recipe_cards";
import { Route, Link, Switch, useHistory } from "react-router-dom";
import NotFound from "./notfound";
import Recipe_form from "./recipe_form";
import Categories from "./categories";
import Detailed_card from "./detailed_card";
import "./style/style.css";

export default function App() {
  const [recipe_list, setRecipe_list] = useState([]);
  const [modif, setModif] = useState(false);
  // Add "edit" in "states"
  const [edit, setEdit] = useState({
    id: 0,
    recipe: "",
    image: "",
    id_category: "",
    ingrediente: "",
    preparation:"",
    duration: "",
    complexity: "",
  });
  const [ingredientsList, setIngredientsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    fetch("http://localhost/recipes/recipes.php")
      .then((rezult) => rezult.text())
      .then((recipelist) => setRecipe_list(JSON.parse(recipelist)));
  }, [modif]);

  // The delete button has been selected in the table
  const deleteCard = (id) => {
    const dateScript = JSON.stringify({ id: parseInt(id, 10) });
    const config = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: dateScript
    };
    // I'm correcting in the database
    fetch("http://localhost/recipes/doDeleteRecipes.php", config).then(() => {
      setModif(!modif); // Modify the variable "modif", so useEffect () is triggered
    });
  };

  // Add the object created in "Recipe_form" to "recipe_list"
  const addCard = (elm) => {
    const dateScript = JSON.stringify(elm);
    const config = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: dateScript
    };

    // I'm correcting in the database
    fetch("http://localhost/recipes/doPostRecipes.php", config).then(() => {
      setModif(!modif); // Modify the variable "modif", so useEffect () is triggered
    });
  };

  const history = useHistory();
  // Function triggered by selecting the "edit_item" button in "ACard"
  const editingCard = (id) => {
    var object = recipe_list.find((item) => {
      return parseInt(item.id, 10) === parseInt(id, 10);
    });
    if (object) {
      setEdit(object);
      history.push("/recipe_form/" + id); // I impose the path "/ recipe_form", so I trigger the 
      // display of the form
    }
  };

  // Replace in "recipe_list" the object edited in "Recipe_form"
  const editCard = (elm) => {
    const dateScript = JSON.stringify(elm);
    const config = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: dateScript
    };

    // I'm correcting in the database
    fetch("http://localhost/recipes/doPatchRecipes.php", config).then(() => {
      setModif(!modif); // Modify the variable "modif", so useEffect () is triggered
    });
    
    // Empty the "edit" object from "states"
    setEdit({});
    history.push("/"); // Force route "/", so the "Recipe_cards" component will be displayed
  };

  useEffect(() => {
    fetch("http://localhost/recipes/ingredients.php")
      .then((rezult) => rezult.text())
      .then((ingredientslist) => setIngredientsList(JSON.parse(ingredientslist)));
  }, [modif]);

  useEffect(() => {
    fetch("http://localhost/recipes/categories.php")
      .then((rezult) => rezult.text())
      .then((categorieslist) => setCategoriesList(JSON.parse(categorieslist)));
  }, [modif]);

  // The delete button has been selected in the table
  const deleteRecingCard = (id_recing) => {
  const dateScript = JSON.stringify({ id_recing: parseInt(id_recing, 10) });
  const config = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: dateScript
  };
  // I'm correcting in the database
  fetch("http://localhost/recipes/doDeleteRecing.php", config).then(() => {
    setModif(!modif); // Modify the variable "modif", so useEffect () is triggered
  });
};

  return (
    <Container fluid>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">Recipes Application</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link as={Link} to="/" >
              Recipes
            </Nav.Link>
            <Nav.Link as={Link} to="/recipe_form/">
              New Recipe
            </Nav.Link>
            <Nav.Link as={Link} to="/categories/1">
              Breakfast Recipes
            </Nav.Link>
            <Nav.Link as={Link} to="/categories/2">
              Lunch Recipes
            </Nav.Link>
            <Nav.Link as={Link} to="/categories/3">
              Dinner Recipes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route exact path="/">
          <Recipe_cards cards={recipe_list} ingredientsCards={ingredientsList} />
        </Route>
        <Route path="/recipe_form/">
          <Recipe_form deliver={addCard} editing={editCard} obedit={edit} 
            ingredientsCards={ingredientsList} cards={recipe_list}
            categoriesCards={categoriesList} modif={modif} recingdelete={deleteRecingCard}/>
        </Route>
        <Route path="/categories/:nr">
          <Categories cards={recipe_list} delete_item={deleteCard} edit_item={editingCard}/>
        </Route>
        <Route path="/detailed_card/:id">
          <Detailed_card cards={recipe_list} delete_item={deleteCard} 
           edit_item={editingCard} ingredientsCards={ingredientsList}
           categoriesCards={categoriesList} />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Container>
  );
}
