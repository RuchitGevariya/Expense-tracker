// src/Components/Context/ExpenseContext.js
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
   
  const [user, setUser] = useState(null);
  const [members, setMembers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentMonth, setCurrentMonth] = useState(new Date());
const [editExpense, setEditExpense] = useState(null);
  const [weeklyTotal, setWeeklyTotal] = useState(0);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [yearlyTotal, setYearlyTotal] = useState(0);
  const [memberTotal, setMemberTotal] = useState(0);
const [loadingSpiner,setLoadingSpiner]=useState(false)
const [categoryExpense,setCategoryExpense]=useState([])

//check backend running or not
  const serviceStarted=async()=>{
      setLoadingSpiner(true)
    try{
     await axios.get(`${import.meta.env.VITE_API_URL}`,{  withCredentials: true})
    }catch(error){
        console.log(error)
    }finally{
      setLoadingSpiner(false)
    }
  }
const userCategoryExpense=async()=>{
    try{
    const res= await axios.get(`${import.meta.env.VITE_API_URL}/api/expense/category`,{withCredentials:true})
     setCategoryExpense(res.data.totalSpent)
    }catch(error){
       console.log(error)
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

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/expense`, {
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
      const [weekRes, monthRes, yearRes,memberRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/expense/weekly/total`, config),
        axios.get(`${import.meta.env.VITE_API_URL}/api/expense/month/total`, config),
        axios.get(`${import.meta.env.VITE_API_URL}/api/expense/year/total`, config),
         axios.get(`${import.meta.env.VITE_API_URL}/api/members/total`, config),
      ]);
      setWeeklyTotal(weekRes.data.total);
      setMonthlyTotal(monthRes.data.total);
      setYearlyTotal(yearRes.data.total);
      setMemberTotal(memberRes.data.total);
    } catch (err) {
      console.error("Error fetching totals", err);
    }
  };

  // Add new expense
  const addExpense = async (data) => {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/expense`, data, {
      withCredentials: true,
    });
    await fetchExpenses();
    await fetchTotals();
    await userCategoryExpense()
  };
  const EditExpense = async (updatedExpense) => {
  try {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/api/expense/${updatedExpense._id}`,
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
    await userCategoryExpense();
  } catch (err) {
    console.error("Failed to update expense:", err);
    toast.error("Failed to update expense");
  }
};


  // Delete expense by ID
  const deleteExpense = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/expense/${id}`, {
      withCredentials: true,
    });
    toast.success("Expense deleted")
    await fetchExpenses();
    await fetchTotals();
    await userCategoryExpense()
  };
const fetchMembers = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/members`, {
      withCredentials: true,
    });
    setMembers(res.data.data);
  } catch (err) {
    console.error("Failed to fetch members", err);
  }
};

const addMember = async (values) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/addMember`,
      values,
      { withCredentials: true }
    );
    if (res.status === 201) {
      toast.success("Member added successfully!");
      await fetchMembers(); //  refresh list after adding
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to add member");
  }
};

const UpdateMember = async (values) => {

  try {
    const res = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/members/update/${values._id}`,{name:values.name},
      { withCredentials: true }
    );
    if (res.status === 200) {
      toast.success("Member has been Updated");
      setMembers((prev)=>prev.map((member)=>member._id ===values._id ?{...member,...values}:member))
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to update member");
  }
};
const DeleteMember = async (values) => {

  try {
    const res = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/members/delete/${values._id}`,
      { withCredentials: true }
    );
    if (res.status === 200) { 
      toast.success("Member has been Deleted");
      setMembers((prev)=>prev.filter((member)=>member._id !== values._id))
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete member");
  }
};
  
  // Load data on mount + when filters/month change
  useEffect(() => {
    fetchExpenses();
    fetchTotals();
  }, [filter, currentMonth]);

useEffect(() => {
  fetchMembers();
}, []);

  return (
    <ExpenseContext.Provider
      value={{
        user,
        setUser,
        memberTotal,
        members,
        UpdateMember,
        DeleteMember,
        setMembers,
        addMember,
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
     serviceStarted,
    categoryExpense,
    userCategoryExpense
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
