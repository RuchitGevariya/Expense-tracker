// Components/DashboardLayout.jsx
import React, { useEffect ,useContext} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import SummaryCards from "./SummaryCards";
import Footer from "./Footer";
import EditExpenseModal from "./EditExpenseModal";
import ExpenseTable from "./ExpenseTable";
import AddExpenseForm from "./AddExpenseForm";
import { ExpenseContext } from "./Context/ExpenseContext";
import CategorywiseExpense from "./CategorywiseExpense";
const DashboardLayout = () => {

const {editExpense,setEditExpense,EditExpense,setUser} = useContext(ExpenseContext);


  const navigate = useNavigate();
  
useEffect(() => {
  const checkToken = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/checkAuth`, {
        withCredentials: true
      });
      
      if (!res.data.success) {
        navigate("/login");
      }
      setUser(res.data.user)
    } catch (error) {
      console.error("Token check failed:", error);
      navigate("/login"); // ⬅️ Redirect on any error (like 401)
    }
  };

  checkToken();
}, []);


  return (
    <>
      <Header />
      <SummaryCards/>

      <div className="dashboard">
        <AddExpenseForm />
        <ExpenseTable onEdit={setEditExpense}/>
      </div>

 {editExpense && (
        <EditExpenseModal
          expense={editExpense}
          onClose={() => setEditExpense(null)}
          onSave={async (updatedExpense) => {
            await EditExpense(updatedExpense); // 🔁 Use context method
            setEditExpense(null);              // Close modal
          }}
        />
      )}
      <CategorywiseExpense/>
      <Footer />
    </>
  );
};

export default DashboardLayout;
