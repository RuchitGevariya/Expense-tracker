import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSearchParams, useNavigate } from "react-router-dom";
const ResetPassword = () => {
  const navigate = useNavigate();
  const [serachParms] = useSearchParams();
  const token = serachParms.get("token");
  const [newPassword, SetNewPassword] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");
 const[showpass,setShowPass]=useState(false)
  const resetForm = () => {
    SetNewPassword("");
    SetConfirmPassword("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return toast.error("Both Password must be same");
    }
    try {
      await axios.post(
        "http://localhost:3001/user/reset-password",
        { newPassword, token },
        { withCredentials: true }
      );
      toast.success("Password Reset Successfully ");
      navigate("/login")
      
    } catch (error) {
      console.error(error)
      toast.error("Token is invaild or expaired")
      resetForm()
    }
  };
  return (
    <div>
      <div className="auth-container">
        <div className="auth-header">
          <h1>
            <i className="fas fa-wallet"></i> Expense Tracker
          </h1>
          <p>Reset Password</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
              <input
                type={`${showpass?"text":"password"}`}
                value={newPassword}
                onChange={(e) => SetNewPassword(e.target.value)}
                className="form-control"
                placeholder="New Password"
              />
               <span className="toggle-password" onClick={() => setShowPass(!showpass)}>
          <i className={`fas ${showpass ? "fa-eye-slash" : "fa-eye"}`}></i>
          </span>
          </div>
          <div className="form-group">
              <input
                type={`${showpass?"text":"password"}`}
                value={confirmPassword}
                onChange={(e) => SetConfirmPassword(e.target.value)}
                className="form-control"
                placeholder="Confirm Password"
              />
               <span className="toggle-password" onClick={() => setShowPass(!showpass)}>
             <i className={`fas ${showpass ? "fa-eye-slash" : "fa-eye"}`}></i>
          </span>
          </div>
          <button type="submit" className="btn btn-primary">
          Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
