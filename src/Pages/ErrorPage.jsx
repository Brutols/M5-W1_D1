import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="mx-auto mt-5 text-center">
      This page doesen't exists!
      <span>
        <Link to={"/"}>
          <a href="!#">Go to Homepage</a>
        </Link>
      </span>
    </div>
  );
};

export default ErrorPage;
