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
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { isNavVisible, setIsVisible } from "../../Reducers/NavInput/navInputSlice";

function TopNav() {
  const [inputValue, setInputValue] = useState("");
  const isDarkMode = useSelector(isDarkModeActive);
  const isVisible = useSelector(isNavVisible)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    dispatch(setIsVisible())
    navigate("/");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSwitch = () => {
    dispatch(handleDarkMode());
  };

  const handleDarkModeClasses = () => isDarkMode ? classes.darkMode_dot_position_dark : classes.darkMode_dot_position;

  const handleInputShow = () => {
    return (
      isVisible ? <Form.Control
      type="text"
      placeholder="Search Books..."
      className={` form-control w-50 ${classes.search_area}`}
      value={inputValue}
      onChange={handleInputChange}
    /> : ""
    )
  }

  useEffect(() => {
    dispatch(filterBooks(inputValue));
  }, [dispatch, inputValue]);

  return (
    <>
      <Navbar
        bg="dark"
        data-bs-theme="dark"
        collapseOnSelect
        expand="lg"
        className={classes.top_nav}
      >
        <Container>
          <Logo className="img_sm" />
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" onClick={handleNavigateHome}>
                Home
              </Nav.Link>
              <Nav.Link href="#">About</Nav.Link>
              <Nav.Link href="#">Browse</Nav.Link>
            </Nav>
            {handleInputShow()}
            <div onClick={handleSwitch} className={`${classes.darkMode_btn} `}>
              <div
                className={`text-center ${
                  classes.darkMode_dot
                } ${handleDarkModeClasses()}`}
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
