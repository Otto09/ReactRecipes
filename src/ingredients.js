import React from 'react';
import Ingredient from './ingredient';

const Ingredients = (props) => {

  const { ingrediente, ingredientsCards } = props;

  // We are looking for the object in the ingredientsCards array that contains the idingredient for the 
  // selected ingredient. If it finds it, send his property ingredientsName to Ingredient component, or 
  // don't send anything to keep the application from crashing.
  const ingredient_list = ingrediente.map((item) => {
    const ingredientinfo = ingredientsCards.find(c => c.idingredient ===  item.idingredient);
  
    return(
      <Ingredient
        idingredient = {item.idingredient}
        ingredientName = {ingredientinfo ? ingredientinfo.ingredientName : null}
        amount = {item.amount}
        unit = {item.unit}
        key = {item.idingredient}
      />
    );
  });

  return ( 
    <>
      <b>Ingredients:</b><br />
      {ingredient_list}<br />
    </>    
  );
}
 
export default Ingredients;
