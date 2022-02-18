import React from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { BsTrashFill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import Card from 'react-bootstrap/Card'
import Ingredients from "./ingredients";

const ACard = (props) => {
  const { image, recipe, ingrediente, duration, complexity, ingredientsCards, id } = props;

  const stilCol = {
    height: '58rem',
    paddingBottom: '12px',
  };

  const bold = {
    fontWeight: 'bold'
  };

  const overflow = {
    height: '20rem',
    overflow: 'auto'
  };

  const tiltleHeight = {
    height: '3.5rem'
  };

  let url = "/detailed_card/" + id;

  return (
    <Col sm={6} style={stilCol}>
      <Card>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title><div style={tiltleHeight}><h4>{recipe}</h4></div></Card.Title>
          <Card.Text>
            <div style={overflow}>
              <Ingredients ingrediente={ingrediente} ingredientsCards={ingredientsCards}/>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p>Duration: <b>{duration} minutes</b></p>
              <p>Complexity: <b>{complexity}</b></p>
            </div>
            <div className="text-center">
              <Button variant="warning" href={url} size="lg">
                More...
              </Button>                                  
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ACard;