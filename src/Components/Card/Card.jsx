import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from "./card.module.css";

function CardElement(props) {
  return (
    <Card className={styles.card_element}>
      <Card.Img variant="top" src={props.src} className={styles.card_img} />
      <Card.Body>
        <Card.Title className='text-truncate'>{props.title}</Card.Title>
        <Card.Text>
          {props.desc}
        </Card.Text>
        <Button variant="primary">{props.price}</Button>
      </Card.Body>
    </Card>
  );
}

export default CardElement;