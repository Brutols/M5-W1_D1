import axios from "axios";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import MyAlert from "../Alert/Alert";
import { nanoid } from "nanoid";
import classes from "./main.module.css";
import CardElement from "../Card/Card";

const Main = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      setLoading(true);

      const res = await axios.get(
        "https://striveschool-api.herokuapp.com/books"
      );

      setBooks(res.data);

      setLoading(false);
    };
    getBooks();
  }, []);

  return (
    <Container className={classes.card_wrapper}>
      {loading ? (
        <MyAlert variant="danger" text="Loading..." />
      ) : (
        books.map((book) => (
          <CardElement
            key={nanoid()}
            title={book.title}
            desc={book.category}
            price={book.price}
            src={book.img}
          />
        ))
      )}
    </Container>
  );
};

export default Main;
