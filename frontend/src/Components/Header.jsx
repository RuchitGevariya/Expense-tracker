import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ExpenseContext } from "./Context/ExpenseContext";
import { useTranslation } from "react-i18next";
import { Segmented, Button, Drawer, Divider } from "antd";
import { MoonOutlined, SunOutlined, SettingFilled } from "@ant-design/icons";
import profile from "../assets/Profile.jpg"

import { ThemeContext } from "./Context/ThemeContext";
const Header = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const { user } = useContext(ExpenseContext);
  const { theme, setTheme } = useContext(ThemeContext);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const HandleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    toast.success(`Language Switch ${lng.toUpperCase()}`);
    setOpen(false);
  };
  const handleLogout = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/logout`,
        {
          withCredentials: true,
        }
      );
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
          <i className="fas fa-wallet"></i> {t("title")}
        </h1>
        <p>{t("subtitle")}</p>
      </div>

      <div className="header-right">
        <div className="user-info">
          <img
            src={profile}
            alt="Profile"
            className="profile-img"
          />
          <span className="username">
            {user?.username
              ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
              : "Guest"}
          </span>
        </div>

        <div className="dropdown">
          <button
            className="btn btn-outline-primary"
            onClick={showDrawer}
            aria-label="Settings"
          >
            <SettingFilled style={{ fontSize: "18px" }} />
          </button>
          <Drawer
            className={theme === "dark" ? "dark-drawer" : ""}
            title={t("drawer.settings")}
            onClose={onClose}
            open={open}
            placement="right"
            width={280}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {/* Language Toggle */}
              <div>
                <div style={{ fontWeight: "500", marginBottom: 8 }}>
                  {t("language")}
                </div>
                <Button block onClick={() => HandleChangeLanguage("en")}>
                  EN - English
                </Button>
                <Button block onClick={() => HandleChangeLanguage("hi")}>
                  HI - हिंदी
                </Button>
                <Button block onClick={() => HandleChangeLanguage("gu")}>
                  GU - ગુજરાતી
                </Button>
              </div>
              <Divider style={{ margin: "12px 0" }} />

              {/* Theme Switcher */}
              <div>
                <div style={{ fontWeight: "500", marginBottom: 8 }}>
                  {t("drawer.theme")}
                </div>
                <Segmented
                  value={theme}
                  onChange={setTheme}
                  options={[
                    { value: "light", icon: <SunOutlined /> },
                    { value: "dark", icon: <MoonOutlined /> },
                  ]}
                  size="large"
                  block
                />
              </div>
              <Divider style={{ margin: "12px 0" }} />
              {/* Logout */}
              <div>
                <div style={{ fontWeight: "500", marginBottom: 8 }}>
                  {t("logout")}
                </div>
                <Button danger onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt me-2"></i> {t("logout")}
                </Button>
              </div>
            </div>
          </Drawer>
        </div>
      </div>
    </header>
  );
};

export default Header;
