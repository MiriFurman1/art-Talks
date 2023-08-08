import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className="flex justify-center md:justify-around flex-wrap p-5 m-0 max-w-screen">
      <div className="lg:w-1/6 w-1/2">
        <Link to="/">
        <img src="/logo-no-background.png" />
        </Link>
      </div>
      <div className="flex justify-around flex-wrap sd:w-2/6">
        
        <Link to="/" className="m-5">
        <button className="bg-purple-500 text-white">Gallery</button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
