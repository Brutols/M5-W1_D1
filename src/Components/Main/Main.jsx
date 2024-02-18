import axios from "axios";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { nanoid } from "nanoid";
import classes from "./main.module.css";
import CardElement from "../Card/Card";
import SpinnerLoader from "../Spinner/Spinner";
import ErrorModal from "../ErrorModal/ErrorModal";

const Main = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getBooks = async () => {
      setLoading(true);

      const res = await axios
        .get("https://striveschool-api.herokuapp.com/books")
        .catch(function (error) {
          if (error.response) {
            setError(`${error.response.status} : ${error.response.message}`);
          } else if (error.request) {
            setError(`${error.request.status} : ${error.request.message}`);
          } else {
            setError(`Ooops something went wrong! ${error.message}`);
          }
        });

      setBooks(res.data);

      setLoading(false);
    };
    getBooks();
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    inputValue
      ? setFilteredBooks(
          books.filter((book) =>
            book.title.toLowerCase().includes(inputValue.toLowerCase())
          )
        )
      : setFilteredBooks([]);
  }, [books, inputValue]);

  return (
    <>
      {error ? <ErrorModal text={error} /> : ""}
      <input
        type="text"
        className={` form-control mt-4 w-50 mx-auto ${classes.search_area}`}
        placeholder="Search books..."
        value={inputValue}
        onChange={handleInputChange}
      />
      <Container className={classes.card_wrapper}>
        {loading ? (
          <SpinnerLoader />
        ) : filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <CardElement
              key={nanoid()}
              title={book.title}
              desc={book.category}
              price={book.price}
              src={book.img}
              asin={book.asin}
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
              asin={book.asin}
            />
          ))
        )}
      </Container>
    </>
  );
};

export default Main;
