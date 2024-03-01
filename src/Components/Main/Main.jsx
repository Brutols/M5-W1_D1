import { useEffect } from "react";
import MyAlert from "../Alert/Alert";
import { Container } from "react-bootstrap";
import classes from "./main.module.css";
import CardElement from "../Card/Card";
import SpinnerLoader from "../Spinner/Spinner";
import ErrorModal from "../ErrorModal/ErrorModal";
import { useDispatch, useSelector } from "react-redux";
import {
  allBooks,
  allFilteredBooks,
  getBooks,
  isAllBooksError,
  isAllBooksLoading,
} from "../../Reducers/books/booksSlice";

const Main = () => {
  const loading = useSelector(isAllBooksLoading);
  const books = useSelector(allBooks);
  const filteredBooks = useSelector(allFilteredBooks);
  const error = useSelector(isAllBooksError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  return (
    <>
    <div className={classes.main_wrapper}>
      <MyAlert variant="success"/>
      {error ? <ErrorModal text={error} /> : ""}
      <Container className={classes.card_wrapper}>
        {loading ? (
          <SpinnerLoader />
        ) : filteredBooks.length > 0 ? (
          filteredBooks.map((book, i) => (
            <CardElement
              key={i}
              title={book.title}
              desc={book.category}
              price={book.price}
              src={book.img}
              asin={book.asin}
            />
          ))
        ) : (
          books.map((book, i) => (
            <CardElement
              key={i}
              title={book.title}
              desc={book.category}
              price={book.price}
              src={book.img}
              asin={book.asin}
            />
          ))
        )}
      </Container>
      </div>
    </>
  );
};

export default Main;
