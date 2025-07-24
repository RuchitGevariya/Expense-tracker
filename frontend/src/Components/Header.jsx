import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const Header = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showLangOptions, setShowLangOptions] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/profile`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setUsername(res.data.username);
        }
      } catch (error) {
        console.error("Profile fetch failed", error);
      }
    };

    fetchProfile();
  }, []);

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
          <span className="username">{username.charAt(0).toUpperCase()+username.slice(1)|| "Guest"}</span>
        </div>

        <button className="menu-btn" onClick={toggleMenu}>
          <i className="fas fa-ellipsis-v"></i>
        </button>

        <div className={`menu-dropdown ${showMenu ? "active" : ""}`}>
          <div className="lang-dropdown">
            <button className="menu-item lang-current" onClick={toggleLangOptions}>
              <span className="lang-flag">🌐</span>
              <span className="lang-text">Language</span>
              <i className="fas fa-chevron-down"></i>
            </button>

            <div className={`lang-options ${showLangOptions ? "active" : ""}`}>
              <button className="menu-item lang-option" data-lang="en">
                <span className="lang-flag">EN</span>
                <span className="lang-text">English</span>
              </button>
              <button className="menu-item lang-option" data-lang="hi">
                <span className="lang-flag">HI</span>
                <span className="lang-text">हिंदी</span>
              </button>
              <button className="menu-item lang-option" data-lang="gu">
                <span className="lang-flag">GU</span>
                <span className="lang-text">ગુજરાતી</span>
              </button>
            </div>
          </div>

          <button className="menu-item" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            <span className="logout-text">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
