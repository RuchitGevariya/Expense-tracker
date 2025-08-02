// src/Components/Context/ExpenseContext.js
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
   
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentMonth, setCurrentMonth] = useState(new Date());
const [editExpense, setEditExpense] = useState(null);
  const [weeklyTotal, setWeeklyTotal] = useState(0);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [yearlyTotal, setYearlyTotal] = useState(0);
const [loadingSpiner,setLoadingSpiner]=useState(false)

//check backend running or not
  const serviceStarted=async()=>{
      setLoadingSpiner(true)
    try{
     await axios.get(`http://localhost:3001/`,{  withCredentials: true})
    }catch(error){
        console.log(error)
    }finally{
      setLoadingSpiner(false)
    }
  }

  const fetchExpenses = async () => {
    try {
      let params = {};
      if (filter === "week") params.filter = "week";
      if (filter === "month") {
        params.filter = "month";
        params.month = currentMonth.getMonth();
        params.year = currentMonth.getFullYear();
      }

      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/expense`, {
        params,
        withCredentials: true,
      });

      setExpenses(res.data.data);
    } catch (err) {
      console.error("Failed to load expenses:", err);
    }
  };

  // Fetch summary totals (week, month, year)
  const fetchTotals = async () => {
    try {
      const config = { withCredentials: true };
      const [weekRes, monthRes, yearRes] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_URL}/api/expense/weekly/total`, config),
        axios.get(`${process.env.REACT_APP_API_URL}/api/expense/month/total`, config),
        axios.get(`${process.env.REACT_APP_API_URL}/api/expense/year/total`, config),
      ]);
      setWeeklyTotal(weekRes.data.total);
      setMonthlyTotal(monthRes.data.total);
      setYearlyTotal(yearRes.data.total);
    } catch (err) {
      console.error("Error fetching totals", err);
    }
  };

  // Add new expense
  const addExpense = async (data) => {
    await axios.post(`${process.env.REACT_APP_API_URL}/api/expense`, data, {
      withCredentials: true,
    });
    await fetchExpenses();
    await fetchTotals();
  };
  const EditExpense = async (updatedExpense) => {
  try {
    await axios.put(
      `${process.env.REACT_APP_API_URL}/api/expense/${updatedExpense._id}`,
      updatedExpense,
      { withCredentials: true }
    );
    toast.success("Expense updated successfully");

    // Update expenses array locally
    setExpenses((prev) =>
      prev.map((exp) =>
        exp._id === updatedExpense._id ? updatedExpense : exp
      )
    );

    await fetchTotals(); // Update summary totals
  } catch (err) {
    console.error("Failed to update expense:", err);
    toast.error("Failed to update expense");
  }
};


  // Delete expense by ID
  const deleteExpense = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/expense/${id}`, {
      withCredentials: true,
    });
    toast.success("Expense deleted")
    await fetchExpenses();
    await fetchTotals();
  };


  // Load data on mount + when filters/month change
  useEffect(() => {
    fetchExpenses();
    fetchTotals();
  }, [filter, currentMonth]);


  return (
    <ExpenseContext.Provider
      value={{
        user,
        setUser,
        expenses,
        setExpenses,
        fetchExpenses,
        filter,
        setFilter,
        currentMonth,
        setCurrentMonth,
        addExpense,
        deleteExpense,
        weeklyTotal,
        monthlyTotal,
        yearlyTotal,
        fetchTotals,
        editExpense,          
     setEditExpense,       
     EditExpense  ,
     loadingSpiner,
     serviceStarted
    
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
