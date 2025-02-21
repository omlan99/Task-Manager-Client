import React from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 space-x-3">
          <li>
          <button className="btn pu px-4 btn-xs sm:btn-sm md:btn-md lg:btn-lg">Register</button>
          </li>
          <li>
          <button className="btn pu px-4 btn-xs sm:btn-sm md:btn-md lg:btn-lg">Login</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
