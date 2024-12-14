import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/actions/user";
import Loader from "./Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const { error, message, loading } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const submitLoginHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
    navigate("/");
  };

  

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <label>Email</label>
          <input
            type="text"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={submitLoginHandler}>Sign In</button>
        </div>
      )}
    </>
  );
};

export default Login;
