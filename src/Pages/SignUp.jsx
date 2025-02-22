import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignUp = () => {
  const { createUser, googleSignIn, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value
    const email = form.email.value;
    const password = form.password.value;
    createUser(email, password).then((result) => {
        // console.log(result.user);
        updateUser(name).then(() => {
          const userInfo = {
            name: name,
        
          }});
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      });
    };
  const handleClick = () => {
    googleSignIn().then((result) => {
      // console.log(result.user);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registration Successful",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    });
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card bg-base-100 w-full p-8 max-w-xl shrink-0 shadow-2xl">
        <h2 className="text-4xl text-center font-medium">Registration</h2>
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="name"
              name="name"
              placeholder="Name"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
            <label className="label">
              {/* <a href="#" className="label-text-alt link link-hover">Forgot password?</a> */}
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
        <div className="text-center pb-4 font-medium text-xl">
            <small>
              Already have an account?{" "} Please {" "}
              <Link className="text-blue-500" to={"/login"}>
                Login
              </Link>
            </small>
        </div>
        <div className="form-control">
          <button onClick={handleClick} className="btn mx-10 ">
            <FcGoogle className="text-xl"></FcGoogle> Google
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default SignUp;
