// App.jsx
import React from "react";


import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import DashboardLayout from "./Components/DashboardLayout";
import "./App.css";
import { ExpenseProvider } from "./Components/Context/ExpenseContext";

const App = () => {
  console.log("API URL:", process.env.REACT_APP_API_URL);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <ExpenseProvider>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<DashboardLayout />} />
          </Routes>
        </ExpenseProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
