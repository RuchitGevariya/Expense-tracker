import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ExpenseContext } from "./Context/ExpenseContext";
import NPprogress from "nprogress"
import 'nprogress/nprogress.css';
const AddExpenseForm = () => {
  const {addExpense}=useContext(ExpenseContext)
  const [loading,setLoading]=useState(false)
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

   const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // returns YYYY-MM-DD
  };
  const [date, setDate] = useState(getTodayDate());
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const resetFormData = () => {
    setTime("");
    setName("");
    setAmount("");
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();
      if (!/^[a-zA-Z\s]+$/.test(name)) {
    return toast.error("Name must contain only letters");
  }
   setLoading(true)
   NPprogress.start()
  try {
    await addExpense({date,time,name,amount})
    toast.success("Expense Added");
    resetFormData();
  } catch (error) {
    console.log(error);
    toast.error("Failed to add expense");
  }finally{
    NPprogress.done()
  setLoading(false)
  }
  
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Add Expense</h2>
        <div id="current-time">{time}</div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Time</label>
          <input
            type="text"
            className="form-control time-display"
            value={time}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Expense Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter expense name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Amount (₹)</label>
          <input
            type="number"
            className="form-control"
            placeholder="0.00"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={`btn btn-primary ${loading?"loading-btn":""}`} disabled={loading}>
           {loading ? (
    <>
      <i className="fas fa-spinner fa-spin"></i> Add Expense...
    </>
  ) : (
    <>
      <i className="fas fa-plus"></i> Add Expense
    </>
  )}
        </button>
        
      </form>
    </div>
  );
};

export default AddExpenseForm;
