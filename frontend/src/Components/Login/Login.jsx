import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading]=useState(false)
  
  const resetForm = () => {
    setEmail("");
    setPassword("");
  };
  const handleSubmit = async (e) => {
  setLoading(true)
    e.preventDefault();
    if (!email) return toast.error("Please enter the username");
    if (!password) return toast.error("Please enter the password");
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/user/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      toast.success("Login successfully");
      resetForm();
      navigate("/dashboard");
    } catch (error){
      console.error(error);
    if (error.response) {
    if (error.response.status === 401) {
      toast.error("Wrong password!");
    } else if (error.response.status === 404) {
      toast.error("User not found!");
    }
  } else {
    toast.error("Please wait, server is waking up...");
  }
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h1>
          <i className="fas fa-wallet"></i> Expense Tracker
        </h1>
        <p>Login to access your expense dashboard</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter your email"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            <input
              type="text"
              value={password}
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </label>
        </div>
       <button
  type="submit"
  className={`btn btn-primary ${loading ? "loading-btn" : ""}`}
  disabled={loading}
>
  {loading ? (
    <>
      <i className="fas fa-spinner fa-spin"></i> Logging in...
    </>
  ) : (
    <>
      <i className="fas fa-sign-in-alt"></i> Login
    </>
  )}
</button>

      </form>

      <button className="btn-link" onClick={() => navigate("/register")}>
        Don't have an account? Register here
      </button>
    </div>
  );
};

export default Login;
