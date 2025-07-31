import React, { useContext, useEffect, useState } from "react";
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

  const [currentpage, setCurrentPage] = useState(1);
  const perPageRecored = 5;
  const totalPages = Math.ceil(expenses.length / perPageRecored);
  const startindex = (currentpage - 1) * perPageRecored;
  const currentexpense = expenses.slice(
    startindex,
    startindex + perPageRecored
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(1, currentpage - 2);
    let end = Math.min(totalPages, start + 4);

    if (end - start < 4) {
      start = Math.max(1, end - 4);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
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
// useEffect(()=>{
//   console.log("expenseOrignal Data:",expenses);
//  console.log("currentexpenseSlice Data:",currentexpense);
//  console.log("currentPage Number:",currentpage);
 
// },[currentexpense,expenses,currentpage])
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
          <div
            className="filter-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3
              className="month-display"
              style={{ fontSize: "1.25rem", fontWeight: "600" }}
            >
              {currentMonth.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h3>
            <div
              className="nav-buttons"
              style={{ display: "flex", gap: "0.5rem" }}
            >
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
        {currentexpense.length > 0 ? (
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
              {currentexpense.map((expense) => (
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
              {/* pagenation */}
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                  {/* Pervious Button */}
                  <li
                    className={`page-item ${currentpage === 1 ? "disabled" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={()=>handlePageChange(currentpage - 1)}
                    >
                      Previous
                    </button>
                  </li>
                  {/* dynmic Page Number */}
                  {getPageNumbers().map((page) => (
                    <li
                      key={page}
                      className={`page-item ${
                        page === currentpage ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    </li>
                  ))}
                  {/* Next button */}
                  <li class="page-item">
                    <button
                      className={`page-link ${currentpage===totalPages?"disabled":""}`}
                      onClick={()=>handlePageChange(currentpage + 1)}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
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
