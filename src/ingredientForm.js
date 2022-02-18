import React from 'react';
import { Row, Col, Button } from "react-bootstrap";
import { BsTrashFill, BsPencilSquare } from "react-icons/bs";

const IngredientForm = (props) => {

    const { ingredientName, amount, unit, idingredient, recingdelete, ingredientsEdit,
     id_recing } = props;
    
    const stil = {
      svg: {
        pointerEvents: "none"
      }
    };

    return (
        <>
          <Row className="align-items-center">
            <Col sm={9}>
              {ingredientName ? ingredientName : null} <b>{amount} {unit}</b>
            </Col>
            <Col sm={3}>
              <Button variant="link" onClick={() => ingredientsEdit(idingredient)} 
                idingredient={idingredient} style={stil}>
                <BsPencilSquare />
              </Button>
              <Button variant="link" onClick={() => recingdelete(id_recing)} 
                id_recing={id_recing} style={stil}>
                <BsTrashFill />
              </Button>
            </Col>
          </Row>
        </>
    );
}
 
export default IngredientForm;
