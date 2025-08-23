import React, { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { ExpenseContext } from "./Context/ExpenseContext";
import NPprogress from "nprogress";
import "nprogress/nprogress.css";
import { useTranslation } from "react-i18next";
import { Button, Select } from "antd";
const { Option } = Select;
import axios from "axios";
const AddExpenseForm = () => {
  const { t } = useTranslation();
  const { addExpense, members } = useContext(ExpenseContext);
  const [loading, setLoading] = useState(false);

  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const [category, setCategory] = useState("");
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
    setCategory("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return toast.error(t("addExpense.validation.name"));
    }

    setLoading(true);
    NPprogress.start();

    try {
      await addExpense({
        date,
        time,
        name,
        category,
        amount,
        member: selectedMember,
      });
      toast.success(t("addExpense.success"));
      resetFormData();
    } catch (error) {
      console.error(error);
      toast.error(t("addExpense.error"));
    } finally {
      NPprogress.done();
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">{t("addExpense.title")}</h2>
        <div id="current-time">{time}</div>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Member Select */}
        <div className="form-group">
          <label htmlFor="Member Name">Member Name {""}(Optional)</label>
          <Select
            value={selectedMember || undefined}
            onChange={(value) => setSelectedMember(value)}
            placeholder="Select a Member"
            allowClear
            className="ant-select"
          >
            {members.length === 0 && <Option>Member Not Found</Option>}
            <Option value="">Select Member</Option>
            {members.map((m) => (
              <>
                <Option key={m._id} value={m._id}>
                  {m.name.charAt(0).toUpperCase() + m.name.slice(1)}
                </Option>
              </>
            ))}
          </Select>
        </div>
        <div className="form-group">
          <label>{t("addExpense.date")}</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>{t("addExpense.time")}</label>
          <input
            type="text"
            className="form-control time-display"
            value={time}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>{t("addExpense.name")}</label>
          <input
            type="text"
            className="form-control"
            placeholder={t("addExpense.namePlaceholder")}
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
          <label>{t("addExpense.amount")}</label>
          <input
            type="number"
            className="form-control"
            placeholder={t("addExpense.amountPlaceholder")}
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <Button
          htmlType="submit"
          type="primary"
          className={`${loading ? "loading-btn" : ""}`}
          disabled={loading}
          size="large"
        >
          {loading ? (
            <>
              <i className="fas fa-spinner fa-spin"></i>{" "}
              {t("addExpense.loading")}
            </>
          ) : (
            <>
              <i className="fas fa-plus"></i> {t("addExpense.submit")}
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default AddExpenseForm;
