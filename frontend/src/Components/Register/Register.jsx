import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import toast from "react-hot-toast";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();

  // Separate states for each field
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = () => {
    setEmail("");
    setUsername("");
    setPassword("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    if (!email) return toast.error("Please enter the email");
    if (!username) return toast.error("Please enter the username");
    if (!password) return toast.error("Please enter the password");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Enter a valid email address");
    }

    if (username.length < 4) {
      toast.error("Username must be at least 4 characters");
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
    }
    try{
    await axios.post(`${process.env.REACT_APP_API_URL}/user/signup`, {
      email,
      username,
      password,
    })
    toast.success("User register successfully")
resetForm()
    }catch(error){
      console.error(error)
      toast.error("Please wait server loading...")
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h1>
          <i className="fas fa-wallet"></i> Expense Tracker
        </h1>
        <p>Create your account to start tracking expenses</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          <i className="fas fa-user-plus"></i> Register
        </button>
      </form>

      <button className="btn-link" onClick={() => navigate("/login")}>
        Already have an account? Login here
      </button>
    </div>
  );
};

export default Register;
