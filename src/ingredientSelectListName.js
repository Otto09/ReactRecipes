import React from 'react';
import AnOptionIngredientName from "./anOptionIngredientName";

const IngredientSelectListName = (props) => {

    const { ingredientsCards } = props;

    const ingredientSelectListName = ingredientsCards.map((item) => (
        
        <AnOptionIngredientName                     
        ingredientName={item.ingredientName}
        unit={item.unit} 
        idingredient={item.idingredient}
        key={item.idingredient}  
        />
    ));

    return (
        <> 
          {ingredientSelectListName} 
        </>  
    );
}
 
export default IngredientSelectListName;