import React from "react";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card'
import Ingredients from "./ingredients";

const PageCard = (props) => {
  const { image, recipe, category, ingrediente, preparation, delete_item, edit_item, 
    id, ingredientsCards } = props;

  const tiltleHeight = {
    height: '3.5rem'
  };

  return (  
    <Card>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title><div style={tiltleHeight}><h4>{recipe}</h4></div></Card.Title>
        <Card.Text>
          <strong>Category:</strong> {category ? category : null}<br /><br />
          <Ingredients ingrediente={ingrediente} ingredientsCards={ingredientsCards} />
          <b>Preparation:</b><br />
          <div>{preparation}</div><br />
          <div className="text-center">
            <Button variant="primary" onClick={() => edit_item(id)} id={id}   size="lg">
              Edit
            </Button>{' '}
            
            <Button variant="primary" onClick={() => delete_item(id)} id={id} href="/" 
              size="lg">
                
              Delete
            </Button>{' '}

            <Button variant="warning" href="/" size="lg">
              Recipes
            </Button>            
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default PageCard;