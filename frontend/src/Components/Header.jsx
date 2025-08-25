import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ExpenseContext } from "./Context/ExpenseContext";
import { useTranslation } from "react-i18next";
import {
  List,
  Avatar,
  Segmented,
  Button,
  Drawer,
  Divider,
  Input,
  Form,
  Modal,
  Select,
} from "antd";
import {
  MoonOutlined,
  SunOutlined,
  SettingFilled,
  UserAddOutlined,
} from "@ant-design/icons";
import profile from "../assets/Profile.jpg";
import AntdModal from "./AntdModal";
import { ThemeContext } from "./Context/ThemeContext";
const Header = () => {
  // useContext Values
  const { t, i18n } = useTranslation();
  const { members, user, addMember,UpdateMember} = useContext(ExpenseContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
 const [mode,setMode]=useState(null)
   const [modalopen, setModalOpen] = useState(false);
   const [editData,setEditData]=useState(null)
  const [loading, setLoading] = useState(false);
  

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
 const handleAddClick=()=>{
    setMode("add")
    setEditData(null)
    setModalOpen(true)
  }
   const handleEditClick=(members)=>{
    setMode("edit")
    setEditData(members)
    setModalOpen(true)
  }
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if(mode ==="add"){
 await addMember(values);
      setModalOpen(false);
      setLoading(false)
      }
     else{
      await UpdateMember(values)
      setModalOpen(false);
      setLoading(false)
     }
    } catch (error) {
      toast.error("Server issue please try again");
    } finally {
      setLoading(false);
    }
  };
useEffect(()=>{

},[])
 
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
          <img src={profile} alt="Profile" className="profile-img" />
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
                <Select
                  defaultValue="en"
                  style={{ width: "100%" }}
                  onChange={HandleChangeLanguage}
                  options={[
                    { value: "en", label: "EN - English" },
                    { value: "hi", label: "HI - हिंदी" },
                    { value: "gu", label: "GU - ગુજરાતી" },
                  ]}
                />
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
                />
              </div>
              <Divider style={{ margin: "12px 0" }} />
              {/* Setting Member*/}
              <div>
                <div style={{ fontWeight: "500", marginBottom: 8 }}>
                  Member Setting
                </div>
                {/* Add Member Option  */}
                <Button
                  type="primary"
                  icon={<UserAddOutlined />}
                  onClick={()=>handleAddClick()}
                >
                  Add Member
                </Button>
                {/* icon with MemberName */}
                <div className="mt-2">
                  {members && members.length > 0 ? (
                    <List
                      itemLayout="horizontal"
                      dataSource={members}
                      split={false}
                      renderItem={(m) => (
                        <List.Item
                          actions={[
                            <Button key="edit" size="small" type="default" onClick={()=>handleEditClick(m)}>
                              Edit
                            </Button>,
                          ]}
                        >
                          <List.Item.Meta
                            avatar={
                              <Avatar style={{ backgroundColor: "#1890ff" }}>
                                {m.name ? m.name.charAt(0).toUpperCase() : "M"}
                              </Avatar>
                            }
                            title={m.name}
                          />
                        </List.Item>
                      )}
                    />
                  ) : (
                    <p style={{ fontSize: "13px", color: "#888" }}>
                      No Members Found
                    </p>
                  )}
                </div>
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
          {/* antModal to passing props */}
          <AntdModal
          visible={modalopen}
          mode={mode}
          initalValuse={editData}
          onSubmit={handleSubmit}
          onCancel={()=>setModalOpen(false)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
