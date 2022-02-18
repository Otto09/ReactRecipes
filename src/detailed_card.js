import React from 'react';
import { useParams } from "react-router-dom";
import { Container } from 'react-bootstrap';
import PageCard from "./pageCard";

const Detailed_card = (props) => {
    
    const { id } = useParams();// Destructuring. There can be several parameters.
    const { cards, delete_item, edit_item, ingredientsCards, categoriesCards  } = props;

    const detailed_filter = cards.filter((item) => {
        if (item.id === id) {
            return true;
        }
        return false;
    })

    const recipe_detailed = detailed_filter.map((item) => {
        const categoryinfo = categoriesCards.find(c => c.id_category === item.id_category);

        return(
            <PageCard                          
                recipe={item.recipe}
                image={item.image}
                id_category={item.id_category}
                category={categoryinfo ? categoryinfo.category : null}
                ingrediente={item.ingrediente}           
                preparation={item.preparation} 
                id={item.id}
                key={item.id} 
                delete_item={delete_item}
                edit_item={edit_item}
                ingredientsCards={ingredientsCards} 
            />
        );
    });

    const stil = {
        h2: { textAlign: "center" }
    };

    return (
        <Container>
          <h2 className="mt-3 mb-3" style={stil.h2}>
            Recipe
          </h2>
        {recipe_detailed}            
        </Container>
    );
}
 
export default Detailed_card;