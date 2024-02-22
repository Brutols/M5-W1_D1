import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "./card.module.css";
import { useState } from "react";
import CommentArea from "../CommentArea/CommentArea";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";
import { isDarkModeActive } from "../../Reducers/darkMode/darkModeSlice";

function CardElement(props) {
  const [isSelected, setIsSelected] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const isDarkMode = useSelector(isDarkModeActive);

  const handleCardClick = () => {
    setModalShow(!modalShow);
  };

  const handleCardHover = () => {
    setIsSelected(!isSelected);
  };

  const tooltip = (
    <Tooltip id="tooltip">
      <strong>Check comments!</strong>
    </Tooltip>
  );

  return (
    <>
      <OverlayTrigger placement="top" overlay={tooltip} delay={300}>
        <Card
          className={`${
            isDarkMode ? styles.card_element_dark : styles.card_element
          } ${
            isSelected
              ? isDarkMode
                ? styles.border_white
                : styles.border_black
              : ""
          }`}
        >
          <Card.Img
            variant="top"
            src={props.src}
            className={styles.card_img}
            onMouseEnter={handleCardHover}
            onMouseLeave={handleCardHover}
            onClick={handleCardClick}
          />
          <Card.Body>
            <Card.Title className="text-truncate">{props.title}</Card.Title>
            <Card.Text>{props.desc}</Card.Text>
            <Button variant={`${isDarkMode ? "light" : "dark"}`}>{props.price}</Button>
          </Card.Body>
        </Card>
      </OverlayTrigger>
      {modalShow ? (
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
