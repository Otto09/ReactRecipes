import React from 'react';

const AnOptionCategory = (props) => {

    const { category, id_category } = props;    

    return (
        <option value={id_category}>{category}</option>       
    );
}
 
export default AnOptionCategory;