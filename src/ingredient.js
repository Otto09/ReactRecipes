import React from 'react';

const Ingredient = (props) => {

    const { ingredientName, amount, unit } = props;    

    return (
        <>
          {ingredientName} <b>{amount} {unit}</b><br />
        </>
    );
}
 
export default Ingredient;