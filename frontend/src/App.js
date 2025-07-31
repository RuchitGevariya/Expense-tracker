// App.jsx
import React, { useContext, useEffect } from "react";
import { ExpenseContext } from "./Components/Context/ExpenseContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import DashboardLayout from "./Components/DashboardLayout";
import "./App.css";
import { ExpenseProvider } from "./Components/Context/ExpenseContext";
import ForgetPassword from "./Components/ForgetPassword";
import ExpenseTrackerSpinner from "./Components/ExpenseTrackerSpinner/ExpenseTrackerSpinner";

const App = () => {
  const { loadingSpiner, serviceStarted } = useContext(ExpenseContext);
  useEffect(() => {
    serviceStarted();
  }, []);
  if (loadingSpiner) {
   return(
    <ExpenseTrackerSpinner /> 
   )
    // return (
    //   <div
    //     style={{
    //       height: "100vh",
    //       display: "flex",
    //       justifyContent: "center",
    //       alignItems: "center",
    //     }}
    //   >
    //     <i
    //       className="fas fa-spinner fa-spin"
    //       style={{ fontSize: "3rem", color: "#4361ee" }}
    //     ></i>
    //   </div>
    // );
    
  }
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <ExpenseProvider>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgetPassword />} />
            <Route path="/dashboard" element={<DashboardLayout />} />
          </Routes>
        </ExpenseProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
