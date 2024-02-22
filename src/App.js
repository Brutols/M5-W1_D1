import { useSelector } from "react-redux";
import BottomFooter from "./Components/Footer/BottomFooter";
import Main from "./Components/Main/Main";
import TopNav from "./Components/Nav/Nav";
import { isDarkModeActive } from "./Reducers/darkMode/darkModeSlice";


function App() {
  const isDarkMode = useSelector(isDarkModeActive)
  document.body.style.backgroundColor = isDarkMode ? "black" : "white" ;
  return (
    <>
      <TopNav />
      <Main />
      <BottomFooter />
    </>
  );
}

export default App;
