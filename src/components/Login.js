import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const [token, setToken] = useState("");

  const handleSumbit = (e) => {
    e.preventDefault();
    accessUser(credentials.email, credentials.password);
  };

  const accessUser = async (email, password) => {
    const response = await fetch("http://127.0.0.1:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const { token, success } = await response.json();
    if (success===true) {
      console.log(success+"  "+token);
      setToken(token);
      localStorage.setItem("token", token);
      navigate("/");
    } else {
      alert("Hello");
    }
  };

  //  OnChange Functionality
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form onSubmit={handleSumbit}>
        <div className="mb-3 my-5">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            onChange={handleChange}
            name="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            value={credentials.email}
          ></input>
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            onChange={handleChange}
            name="password"
            value={credentials.password}
            className="form-control"
            id="password"
          ></input>
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          ></input>
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default Login;
