import React from "react";
import styles from "./details.module.css";
import { Card } from "react-bootstrap";

const Details = ({title, img, desc, price, children}) => {
  return (
    <div className={`row container mx-auto ${styles.detail_wrapper}`}>
      <div className="col-12 col-lg-8">
        <h1 className="text-white bg-dark rounded-3 p-3">{title}</h1>
        <Card>
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Text>
            {desc}
          </Card.Text>
          <Card.Text>
            {`${price} $`}
          </Card.Text>
        </Card.Body>
      </Card>
      </div>
      <div className="col-12 col-lg-4">{children}</div>
    </div>
  );
};

export default Details;
