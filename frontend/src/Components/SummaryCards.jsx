import React from "react";

const SummaryCards = ({
  weeklyTotal = 0,
  monthlyTotal = 0,
  yearlyTotal = 0,
}) => {
  const safeWeekly = Number(weeklyTotal) || 0;
  const safeMonthly = Number(monthlyTotal) || 0;
  const safeTotal = Number(yearlyTotal) || 0;

  return (
    <div className="summary-cards">
      <div className="summary-card">
        <h2>Weekly Expenses</h2>
        <div className="amount">₹{safeWeekly.toFixed(2)}</div>
        <div className="period">This week</div>
      </div>
      <div className="summary-card">
        <h2>Monthly Expenses</h2>
        <div className="amount secondary">₹{safeMonthly.toFixed(2)}</div>
        <div className="period">This month</div>
      </div>
      <div className="summary-card">
        <h2>Total Expenses</h2>
        <div className="amount">₹{safeTotal.toFixed(2)}</div>
        <div className="period">All time</div>
      </div>
    </div>
  );
};

export default SummaryCards;
