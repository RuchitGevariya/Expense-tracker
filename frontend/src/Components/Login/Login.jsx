import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { validateLoginInputs } from "../../utils/validateLoginInputs";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
const [showforgetpassword,setShowForgetPassword]=useState(false);
  const resetForm = () => {
    setEmail("");
    setPassword("");
    setShowForgetPassword(false)
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
     setShowForgetPassword(false)
    const error = validateLoginInputs({ email, password });
    if (error) {
      toast.error(error);
      setLoading(false);
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      toast.success("Login successfully");
      resetForm();
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      if (error.response) {
        if (error.response.status === 401) {
          setShowForgetPassword(true)

        } else if (error.response.status === 404) {
          toast.error("User not found!");
        }
      } else {
        toast.error("Please wait, server is waking up...");
      }
    } finally {
      setLoading(false);
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
          <label htmlFor="Email">
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
      {showforgetpassword && (
  <div className="alert alert-warning d-flex justify-content-between align-items-center p-2 mt-2" role="alert">
    <span className="me-2">
      <i className="fas fa-exclamation-triangle me-1"></i>
      Wrong password.{""}
      <button
        className="btn btn-link p-0 m-0 align-baseline text-decoration-none"
        onClick={() => navigate("/forgot-password")}
      >
        Forgot password?
      </button>
    </span>
    <button
      type="button"
      className="btn-close btn-sm"
      onClick={() => setShowForgetPassword(false)}
      aria-label="Close"
    ></button>
  </div>
)}       
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
