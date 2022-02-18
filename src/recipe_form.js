import React, { useState } from "react";
import {Form, Button, Container, Row, Col} from "react-bootstrap";
import IngredientsForm from "./ingredientsForm";
import AddIngredientsForm from "./addIngredientsForm";
import CategorySelectList from "./categorySelectList";
import IngredientSelectListName from "./ingredientSelectListName";
import { MdCheckCircle, MdAddCircle } from "react-icons/md";

const Recipe_form = (props) => {
  const [id, setId] = useState(props.obedit.id);
  const [recipe, setRecipe] = useState(props.obedit.recipe);
  const [image, setImage] = useState(props.obedit.image);
  const [id_category, setId_category] = useState(props.obedit.id_category);
  const [ingrediente, setIngrediente] = useState(props.obedit.ingrediente);
  const [preparation, setPreparation] = useState(props.obedit.preparation);
  const [duration, setDuration] = useState(props.obedit.duration);
  const [complexity, setComplexity] = useState(props.obedit.complexity);
  const [idingredient, setIdingredient] = useState(0);
  const [idingredientold, setIdingredientold] = useState(0);
  const [ingredientName, setIngredientName] = useState("");
  const [unit, setUnit] = useState("");
  const [nr, setNr] = useState("");
  const [amount, setAmount] = useState("");
  const [showlist, setShowlist] = useState(true);
  const [recipeIngredientsList, setRecipeIngredientsList] = useState([]);
  const [recipeIngredientsListEdit, setRecipeIngredientsListEdit] = useState([]);

  const { cards, ingredientsCards, recingdelete } = props;

  const stil = {
    h2: { textAlign: "center" }
  };

  const ingredients_filter = cards.filter((item) => {
    if (item.id === id) {
        return true;
    }
    return false;
  })

  // Pressing the BSPencilSquare button stores the idingredient value, searches for that 
  // idingredient in the ingrediente array of objects and stores it in idingredient and 
  // amount in state.
  const editingIngredient = (idingredient) => {
    setIdingredientold(idingredient);
    const sendinfostate = ingrediente.find(c => c.idingredient === idingredient)
    //console.log('idingredient', sendinfostate.idingredient, 'amount', sendinfostate.amount);
    setIdingredient(sendinfostate.idingredient);
    setAmount(sendinfostate.amount); 
  };
  
  const ingredientsList = ingredients_filter.map((item) => (
    <IngredientsForm                     
      ingrediente={item.ingrediente} 
      id={item.id}
      key={item.id}        
      recingdelete={recingdelete}
      ingredientsEdit={editingIngredient}
      ingredientsCards={ingredientsCards}          
    />
  ));

  // We are looking for the object in the ingredientsCards array that contains the 
  // idingredient for the selected ingredient. If it finds it, send his property 
  // ingredientName to AddIngredientsForm component, or don't send anything to keep the 
  // application from crashing.
  const list = recipeIngredientsList.map((item) => { 
    const { ingredientsCards } = props;
    const ingredientinfo = ingredientsCards.find(c => c.idingredient === item.idingredient);

    return(
      <AddIngredientsForm
        ingredientName={ingredientinfo ? ingredientinfo.ingredientName : null}
        unit={ingredientinfo ? ingredientinfo.unit : null}
        amount = {item.amount} 
        idingredient={item.idingredient}
        key={item.nr}
        nr={item.nr}
      />
    ); 
  });

  const afterAddIngredient = (evt) => {
    evt.preventDefault();
    const newIngredients = {amount, idingredient, ingredientName, unit, nr};
    
    setAmount("");
    setIdingredient("");
    
    // la sirul de obiecte playerclubslist imi adauga o prima valoare {} pe care o 
    // scoatem, provenita din <option value="0">Choose Ingredient</option>
    if (
      recipeIngredientsList.length === 1
      && Object.getOwnPropertyNames(recipeIngredientsList[0]).length === 0
    ) {
      newIngredients.nr = 1;
      setRecipeIngredientsList([newIngredients]);
    }
    else {
      newIngredients.nr = recipeIngredientsList.length + 1;
      setRecipeIngredientsList([...recipeIngredientsList, newIngredients]);
    }
  }

  // After editing the amount and ingredient, by pressing the MdCheckCircle button, the 
  // index number of ingredient in the ingrediente array is searched, if it is found, the 
  // ingrediente array is cloned, the idingredient and amount values for that ingredient 
  // are replaced and the new ingredient array is sent to state.
  const aftereditingredient = (evt) => {
    evt.preventDefault(); 
    
    const index = ingrediente.findIndex(c => c.idingredient === idingredientold);
    if (index >= 0) {
      const newIngredients = [...ingrediente];
      newIngredients[index] = {idingredient, amount};
      console.log(index, newIngredients[index]);
      setRecipeIngredientsListEdit(newIngredients);
    } else {
      console.log("Club not found.");
    }
  }

  const afterSubmit = (evt) => {
    evt.preventDefault();
    const recipe_card = {
      recipe,
      image: `../imagini/${image}`,
      id_category,
      ingrediente: (id > 0) ? recipeIngredientsListEdit : recipeIngredientsList,
      preparation,
      duration,
      complexity,
      id
    };

    if (id > 0) {
      recipe_card.id = id;
      props.editing(recipe_card);
    } else {
      props.deliver(recipe_card);
    }
    // I empty the form controls
    setRecipe("");
    setImage("");
    setId_category("");
    setPreparation("");
    setDuration("");
    setComplexity("");
    setIdingredient(0);
    setAmount("");

    setShowlist(false);
  };
  
  const stil2 = {
    width: "750px",
  };

  const stil3 = {
    svg: {
      pointerEvents: "none"
    }
  };

  return (
    <Container  style={stil2}>
      <h2 className="mt-4" style={stil.h2}>
        {id > 0 ? "Edit recipe" : "New recipe"}
      </h2>
      <hr />
      <Form onSubmit={afterSubmit}>
        <Form.Group>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            value={recipe}
            onChange={(e) => setRecipe(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Image:</Form.Label>
          <Form.Control
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>
            Category:
          </Form.Label>
          
          <Form.Control as="select" value={id_category} onChange={ev => setId_category(ev.target.value)}>
            <option value="0">Choose category</option>
            <CategorySelectList categoriesCards={props.categoriesCards}/>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Duration:</Form.Label>
          <Form.Control
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Complexity:</Form.Label>
          <Form.Control
            type="text"
            value={complexity}
            onChange={(e) => setComplexity(e.target.value)}
          />
        </Form.Group><br />

        <b>Ingredients:</b><br />
        
        { (id > 0) ? ingredientsList : (showlist ? list : null) }<br />        

        <Form.Group>
          <Form.Label>Preparation:</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            value={preparation}
            onChange={(e) => setPreparation(e.target.value)}
          />
        </Form.Group><br />

        <Row className="align-items-center">
          <Col sm={2}>
            <Form.Control
              type="text"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Col>

          <Col sm={2}>
            Ingredient:
          </Col>

          <Col sm={5}>             
            <Form.Control as="select" value={idingredient} 
              onChange={ev => {setIdingredient(ev.target.value) }}>
              <option value="0">Choose Ingredient</option>
              <IngredientSelectListName ingredientsCards={props.ingredientsCards}/>  
            </Form.Control>
          </Col>

          {id > 0
            ? <Col xs="auto">
                <Button variant="link" style={stil3} size="lg" onClick={aftereditingredient}>
                  <MdCheckCircle />
                </Button>
              </Col>
            : null
          }   

          {id === 0
            ? <Col xs="auto">
                <Button variant="link" style={stil3} size="lg" onClick={afterAddIngredient}>
                  <MdAddCircle />
                </Button>
              </Col>
            : null
          }
        </Row>

        <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
          <Button variant="primary" type="submit" size="lg">
            Save
          </Button>

          <Button variant="primary" type="reset" href="/" size="lg">
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Recipe_form;
