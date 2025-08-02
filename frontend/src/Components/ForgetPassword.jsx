import React, { useState } from "react";
import { validEmailForForgetPassword } from "../utils/validateLoginInputs";
import toast from "react-hot-toast";
import axios from "axios";
const ForgetPassword = () => {
  const [email, setEmail] = useState("");        

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    const error = validEmailForForgetPassword(email);
    if (error) {
      return toast.error(error);
    }
    try{
   await axios.post(
      `${process.env.REACT_APP_API_URL}/user/forgot-password`,
      { email },
      { withCredentials: true }
    );
   toast.success("email send successfully")
   setEmail("")
    }catch(error){
      console.log(error);
    }

  };
  return (
    <>
      <div className="auth-container">
        <div className="auth-header">
          <h1>
            <i className="fas fa-wallet"></i> Expense Tracker
          </h1>
          <p>Please Enter The Register Email</p>
        </div>
        <form onSubmit={handleSubmitEmail}>
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
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgetPassword;
