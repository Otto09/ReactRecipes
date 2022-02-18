import React from 'react';

const AnOptionIngredientUnit = (props) => {

    const { ingredientName, unit, idingredient, key } = props;    

    return (
        <>
            <option>{unit}</option><br />
        </>
    );
}
 
export default AnOptionIngredientUnit;