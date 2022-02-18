import React from 'react';
import { Container, Row } from 'react-bootstrap';
import ACard from "./acard";

const Recipe_cards = (props) => {

    const { cards, ingredientsCards } = props;
    
    const recipe_list = cards.map((item) => (

        <ACard                          
            recipe={item.recipe}
            image={item.image} 
            ingrediente={item.ingrediente}            
            duration={item.duration}
            complexity={item.complexity} 
            id={item.id}
            key={item.id}
            ingredientsCards={ingredientsCards}  
        />
    ));

    const stil = {
        h2: { textAlign: "center" }
    };

    return (
        <Container>
          <h2 className="mt-3 mb-3" style={stil.h2}>
            Recipes
          </h2>
          <Row>{recipe_list}</Row>
        </Container>
    );
}
 
export default Recipe_cards;
