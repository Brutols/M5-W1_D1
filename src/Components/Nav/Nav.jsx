import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../Logo/Logo";
import { useDispatch, useSelector } from "react-redux";
import { filterBooks } from "../../Reducers/books/booksSlice";
import { useState, useEffect } from "react";
import classes from "./nav.module.css";
import {
  handleDarkMode,
  isDarkModeActive,
} from "../../Reducers/darkMode/darkModeSlice";
import { IoMoon, IoSunny } from "react-icons/io5";

function TopNav() {
  const [inputValue, setInputValue] = useState("");
  const isDarkMode = useSelector(isDarkModeActive);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSwitch = () => {
    dispatch(handleDarkMode());
  };

  useEffect(() => {
    dispatch(filterBooks(inputValue));
  }, [dispatch, inputValue]);

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" collapseOnSelect expand="lg" className={classes.top_nav}>
        <Container>
          <Logo className="img_sm" />
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">About</Nav.Link>
              <Nav.Link href="#">Browse</Nav.Link>
            </Nav>
            <input
              type="text"
              className={` form-control w-50 ${classes.search_area}`}
              placeholder="Search books..."
              value={inputValue}
              onChange={handleInputChange}
            />
            <div onClick={handleSwitch} className={`${classes.darkMode_btn} `}>
              <div
                className={`text-center ${classes.darkMode_dot} ${
                  isDarkMode
                    ? classes.darkMode_dot_position_dark
                    : classes.darkMode_dot_position
                }`}
              >
                {isDarkMode ? <IoMoon className="text-white" /> : <IoSunny />}
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default TopNav;
