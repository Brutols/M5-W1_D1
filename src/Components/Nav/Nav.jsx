import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../Logo/Logo";
import { useDispatch } from "react-redux";
import { filterBooks } from "../../Reducers/books/booksSlice";
import { useState, useEffect } from "react";
import classes from "./nav.module.css"

function TopNav() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    dispatch(filterBooks(inputValue));
  }, [dispatch, inputValue]);

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" className={classes.top_nav}>
        <Container>
          <Logo className="img_sm" />
          <Nav className="me-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="#">Browse</Nav.Link>
          </Nav>
          <input
            type="text"
            className={` form-control w-50 mx-auto ${classes.search_area}`}
            placeholder="Search books..."
            value={inputValue}
            onChange={handleInputChange}
          />
        </Container>
      </Navbar>
    </>
  );
}

export default TopNav;
