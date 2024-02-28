import React from "react";
import TopNav from "../Components/Nav/Nav";
import BottomFooter from "../Components/Footer/BottomFooter";

const MainLayout = ({ children }) => {
  return (
    <>
      <TopNav />
      {children}
      <BottomFooter />
    </>
  );
};

export default MainLayout;
