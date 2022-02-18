import React from 'react';
import { Row, Col, Button } from "react-bootstrap";
import { BsTrashFill, BsPencilSquare } from "react-icons/bs";

const AddIngredientsForm = (props) => {

  const { ingredientName, amount, unit, idingredient, nr } = props;
  
  const stil = {
    svg: {
      pointerEvents: "none"
    }
  };

  return (idingredient != null
    ? <>
        <Row className="align-items-center">
          <Col sm={9}>
            {ingredientName} <b>{amount} {unit}</b>
          </Col>
        </Row>
      </>
    : null
  );
}
 
export default AddIngredientsForm;
