import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ExpenseContext } from "./Context/ExpenseContext";


const Header = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showLangOptions, setShowLangOptions] = useState(false);
  // const [username, setUsername] = useState("");
const {user}=useContext(ExpenseContext)
  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/profile`, {
  //         withCredentials: true,
  //       });
  //       if (res.data.success) {
  //         setUsername(res.data.username);
  //       }
  //     } catch (error) {
  //       console.error("Profile fetch failed", error);
  //     }
  //   };

  //   fetchProfile();
  // }, []);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
    setShowLangOptions(false);
  };

  const toggleLangOptions = () => {
    setShowLangOptions((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success("Logout success");
      }
    } catch (error) {
      console.log(error);
      toast.error("Can't logout this time");
    }
  };

  return (
    <header className="header-container">
      <div className="header-left">
        <h1>
          <i className="fas fa-wallet"></i> Expense Tracker
        </h1>
        <p>Track your expenses, manage your budget, and download reports</p>
      </div>

      <div className="header-right">
        <div className="user-info">
          <img
            src="https://icon2.cleanpng.com/20200409/zou/transparent-aqua-turquoise-blue-teal-circle-5e8f32ab6d9061.5490807215864429234488.jpg"
            alt="Profile"
            className="profile-img"
          />
          <span className="username">{user?.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : "Guest"}</span>
        </div>

     <div className="dropdown">
 <button
  className="btn btn-outline-primary dropdown-toggle"
  type="button"
  onClick={toggleMenu}
  aria-label="open-menu"
>
  <i className="fas fa-ellipsis-v"></i>
  <span className="visually-hidden">Open options menu</span>
</button>


  {showMenu && (
    <div className="dropdown-menu show" style={{ right: 0, left: "auto" }}>
      {/* Language Toggle */}
      <div className="dropdown-submenu">
        <button
          className="dropdown-item d-flex justify-content-between align-items-center"
          onClick={toggleLangOptions}
        >
          🌐 Language
          <i className="fas fa-chevron-down"></i>
        </button>

        {showLangOptions && (
          <div className="pl-3">
            <button className="dropdown-item">EN - English</button>
            <button className="dropdown-item">HI - हिंदी</button>
            <button className="dropdown-item">GU - ગુજરાતી</button>
          </div>
        )}
      </div>

      <div className="dropdown-divider"></div>

      {/* Logout Button */}
      <button className="dropdown-item text-danger" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt me-2"></i> Logout
      </button>
    </div>
  )}
</div>

      </div>
    </header>
  );
};

export default Header;
