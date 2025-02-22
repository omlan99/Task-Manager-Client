import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { signInUser, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signInUser(email, password).then((result) => {
      console.log(result.user);
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
      console.log(result.user);
      navigate("/")
    });
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card bg-base-100 w-full p-10 max-w-xl shrink-0 shadow-2xl">
        <h2 className="text-4xl text-center font-medium">Login</h2>
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              name="email"
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
              Don't have any account?{" "}
              <Link className="text-blue-500" to={"/signUp"}>
                Create a new Account
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

export default Login;
