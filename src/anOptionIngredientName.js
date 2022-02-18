import React from 'react';

const AnOptionIngredientName = (props) => {

    const { ingredientName, unit, idingredient} = props;    

    return (
        <option value={idingredient}>{ingredientName}</option>       
    );
}
 
export default AnOptionIngredientName;