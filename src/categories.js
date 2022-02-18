import React from 'react';
import { useParams } from "react-router-dom";
import { Container, Row } from 'react-bootstrap';
import ACard from "./acard";

const Categories = (props) => {

    const { nr } = useParams();// Destructuring. There can be several parameters.
    const { cards, delete_item, edit_item } = props;
    
    const category_filter = cards.filter((item) => {
        if (item.id_category === nr) {
            return true;
        }
        return false;
    })
    
    const recipe_list = category_filter.map((item) => (
        <ACard             
             
            recipe={item.recipe}
            image={item.image}
            id_category={item.id_category} 
            ingrediente={item.ingrediente}            
            preparation={item.preparation}
            duration={item.duration}
            complexity={item.complexity} 
            id={item.id}
            key={item.id} 
            delete_item={delete_item}
            edit_item={edit_item} 
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
 
export default Categories;