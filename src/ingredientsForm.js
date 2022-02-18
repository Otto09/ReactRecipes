import React from 'react';
import IngredientForm from './ingredientForm';

const IngredientsForm = (props) => {

  const { ingrediente, recingdelete, ingredientsEdit, ingredientsCards } = props;

  // We are looking for the object in the ingredientsCards array that contains the 
  // idingredient for the selected ingredient.  If it finds it, send his property 
  // ingredientName to IngredientForm component, or don't send anything to keep the 
  // application from crashing.
  const ingredientsList = ingrediente.map((item) => {
    const ingredientinfo = ingredientsCards.find(i => i.idingredient === item.idingredient);

      return(
        <IngredientForm
          idingredient={item.idingredient}                         
          ingredientName={ingredientinfo ?  ingredientinfo.ingredientName : null}
          unit ={item.unit}
          amount={item.amount}
          id_recing={item.id_recing} 
          key={item.idingredient}
          recingdelete={recingdelete}
          ingredientsEdit={ingredientsEdit}
        />
      );
    });

  return (
    <div>
      {ingredientsList}
    </div>
  );
}
 
export default IngredientsForm;
