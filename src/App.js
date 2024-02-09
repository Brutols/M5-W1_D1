
import MyAlert from "./Components/Alert/Alert";
import BottomFooter from "./Components/Footer/BottomFooter";
import Main from "./Components/Main/Main";
import TopNav from "./Components/Nav/Nav";


function App() {
  return (
    <>
      <TopNav />
      <MyAlert variant="success"/>
      <Main />
      <BottomFooter />
    </>
  );
}

export default App;
