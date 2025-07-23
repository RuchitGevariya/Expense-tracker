import React, { useContext } from "react";
import DownloadPDFButton from "./DowloadPdf";
import { ExpenseContext } from "./Context/ExpenseContext";

const ExpenseTable = ({ onEdit }) => {
  const {
    expenses,
    deleteExpense,
    filter,
    setFilter,
    currentMonth,
    setCurrentMonth,
  } = useContext(ExpenseContext);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const goToPrevMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() - 1);
    setCurrentMonth(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() + 1);
    setCurrentMonth(newDate);
  };

  return (
    <div className="card">
      {/* Header */}
      <div className="card-header">
        <h2 className="card-title">Expense Records</h2>

        {/* Filter Tabs */}
        <div className="tabs flex gap-2 mt-4">
          {["all", "week", "month"].map((item) => (
            <button
              key={item}
              className={`tab-btn ${filter === item ? "active" : ""}`}
              onClick={() => setFilter(item)}
            >
              {item === "all" ? "All" : item === "week" ? "Weekly" : "Monthly"}
            </button>
          ))}
        </div>
      </div>

      {/* Month Navigation */}
      {filter === "month" && (
        <div className="mt-4" style={{ display: "block" }}>
          <div className="filter-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 className="month-display" style={{ fontSize: "1.25rem", fontWeight: "600" }}>
              {currentMonth.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h3>
            <div className="nav-buttons" style={{ display: "flex", gap: "0.5rem" }}>
              <button id="prev-month" onClick={goToPrevMonth}>
                <i className="fas fa-chevron-left"></i>
              </button>
              <button id="next-month" onClick={goToNextMonth}>
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table or Empty State */}
      <div className="table-container mt-6">
        {expenses.length > 0 ? (
          <table className="expense-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense._id}>
                  <td>{formatDate(expense.date)}</td>
                  <td>{expense.time}</td>
                  <td>
                    {expense.name.charAt(0).toUpperCase() +
                      expense.name.slice(1)}
                  </td>
                  <td>₹{expense.amount.toFixed(2)}</td>
                  <td>
                    <div className="actions">
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => onEdit(expense)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteExpense(expense._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state text-center py-8">
            <i className="fas fa-receipt fa-2x mb-2"></i>
            <h3 className="text-lg font-semibold">No expenses recorded yet</h3>
            <p className="text-sm text-gray-500">
              Add your first expense to get started.
            </p>
          </div>
        )}
        <DownloadPDFButton filter={filter} currentMonth={currentMonth} />
      </div>
    </div>
  );
};

export default ExpenseTable;
