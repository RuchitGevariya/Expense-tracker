import React, { useState, useEffect } from "react";

const EditExpenseModal = ({ expense, onClose, onSave }) => {
   const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
   const formatDate = (isoString) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  
  return `${year}-${month}-${day}`;
};

  useEffect(() => {
    if (expense) {
      setDate(formatDate(expense.date));
      setTime(expense.time);
      setName(expense.name);
      setAmount(expense.category);
      setAmount(expense.amount);
    }
  }, [expense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...expense,
      date,
      time,
      name,
      category,
      amount: parseFloat(amount)
    };
    onSave(updated);
  };

  if (!expense) return null;

  return (
    <>
    <div id="edit-modal" className="modal" style={{ display: "flex" }}>
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">
            <i className="fas fa-edit"></i> Edit Expense
          </h3>
          
          <button className="close-modal" onClick={onClose}>
            &times;
          </button>
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
              className="form-control"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Expense Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
           <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter the Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
      
          <div className="form-group">
            <label>Amount (₹)</label>
            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
              required
            />
          </div>
          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              <i className="fas fa-save"></i> Save Changes
            </button>
            <button
              type="button"
              className="btn btn-outline"
              style={{ flex: 1 }}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default EditExpenseModal;
