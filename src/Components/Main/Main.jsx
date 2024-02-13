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
  const [inputValue, setInputValue] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      setLoading(true);

      const res = await axios
        .get("https://striveschool-api.herokuapp.com/books")
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser
            // and an instance of http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
        });

      setBooks(res.data);

      setLoading(false);
    };
    getBooks();
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);

    inputValue.length <= 1
      ? setFilteredBooks([])
      : setFilteredBooks(
          books.filter((book) =>
            book.title.toLowerCase().includes(inputValue.toLowerCase())
          )
        );
  };

  return (
    <>
      <input
        type="text"
        className="form-control mt-4 w-50 mx-auto"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="basic-addon1"
        value={inputValue}
        onChange={handleInputChange}
      />
      <Container className={classes.card_wrapper}>
        {loading ? (
          <MyAlert variant="danger" text="Loading..." />
        ) : filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <CardElement
              key={nanoid()}
              title={book.title}
              desc={book.category}
              price={book.price}
              src={book.img}
            />
          ))
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
    </>
  );
};

export default Main;
