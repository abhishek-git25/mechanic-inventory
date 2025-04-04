import React, { useEffect } from "react";
import { Link } from "react-router-dom";



const Home = () => {







  return (
    <div className="container text-center mt-5">
      {/* Heading */}
      <h1 className="mb-4">Mechanical Tools Inventory</h1>


      {/* Login & Signup Buttons */}
      <div>
        <Link to="/login" className="btn btn-primary me-3">
          Login
        </Link>
        <Link to="/signup" className="btn btn-success">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Home;
