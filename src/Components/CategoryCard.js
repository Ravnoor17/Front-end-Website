import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function CategoryCard(props) {
  return (
    <Link to={`/categories/${props.index}`}>
      <Card className="category-card">
        <Card.Body className="category-card-body">
          <img className="category-card-img" src={props.img} alt="skiing" />
          <p className="category-card-title">{props.title}</p>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default CategoryCard;
