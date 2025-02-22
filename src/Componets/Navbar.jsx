import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  // console.log(user)
  const navigate = useNavigate()
  const handleLogOut = () => {
    signOutUser()
      .then(() => {})
      .catch((error) => console.log(error));
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Logging Out",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/login")
  };
  return (
  <div>
    <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">Task Manager</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    
    </ul>
  </div>
  <div className="navbar-end">
  {user ? (
  <>
    {" "}
    <div className="flex items-center gap-4">
              <p className="font-semibold hidden md:block">{user?.displayName}</p>
              
              <Link onClick={handleLogOut} className="btn">
                Logout
              </Link>
            </div>
  </>
) : (
  <>
    {" "}
      <div className="space-x-2">
      <Link to={"/signUp"} className="btn  px-4 ">Register</Link>
   
   <Link to={"/login"} className="btn px-4  ">Login</Link>
      </div>
 

  </>
)}
  </div>
</div>
  </div>
  );
};

export default Navbar;
