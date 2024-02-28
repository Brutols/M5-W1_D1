import { useSelector } from "react-redux";
import { isDarkModeActive } from "./Reducers/darkMode/darkModeSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import ErrorPage from "./Pages/ErrorPage";
import BookDetails from "./Pages/BookDetails";


function App() {
  const isDarkMode = useSelector(isDarkModeActive)
  document.body.style.backgroundColor = isDarkMode ? "black" : "white" ;
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/book-detail/:id" element={<BookDetails />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
