import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "./card.module.css";
import { useState } from "react";
import CommentArea from "../CommentArea/CommentArea";

function CardElement(props) {
  const [isSelected, setIsSelected] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const handleCardClick = () => {
    setIsSelected(!isSelected);
    setModalShow(!modalShow);
  };

  return (
    <>
      <Card
        className={`${styles.card_element} ${
          isSelected ? styles.border_red : ""
        }`}
        onClick={handleCardClick}
      >
        <Card.Img variant="top" src={props.src} className={styles.card_img} />
        <Card.Body>
          <Card.Title className="text-truncate">{props.title}</Card.Title>
          <Card.Text>{props.desc}</Card.Text>
          <Button variant="primary">{props.price}</Button>
        </Card.Body>
      </Card>
      {isSelected ? (
        <CommentArea
          show={modalShow}
          onHide={handleCardClick}
          title={props.title}
          asin={props.asin}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default CardElement;
