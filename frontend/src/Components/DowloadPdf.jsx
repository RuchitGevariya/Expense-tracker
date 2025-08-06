import React, { useState } from "react";
import NPprogress from "nprogress";
import "nprogress/nprogress.css";
import nprogress from "nprogress";
import { Button } from "antd";
import { DownloadOutlined } from '@ant-design/icons';
import toast from "react-hot-toast";
const DownloadPDFButton = ({ filter, currentMonth }) => {
  const [loading, setLoading] = useState(false);
  const downloadPDF = async () => {
    setLoading(true);
    nprogress.start();
    try {
      const params = new URLSearchParams();
      params.append("filter", filter);

      if (filter === "month") {
        params.append("month", currentMonth.getMonth());
        params.append("year", currentMonth.getFullYear());
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/expense/pdf?${params.toString()}`,
        {
          credentials: "include",
        }
      );
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${filter}_expense.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF download failed:", err);
      toast.error("Failed to download PDF,Might Be Sever Issue");
    } finally {
      setLoading(false);
      nprogress.done();
    }
  };

  return (
    <Button
      type="primary"
      shape="round"
      icon={<DownloadOutlined />}
      size="large"
      onClick={downloadPDF}
      style={{ marginTop: "10px" }}
    >
      {loading
        ? "Generating PDF..."
        : `${
            filter === "all"
              ? "All"
              : filter.charAt(0).toUpperCase() + filter.slice(1)
          } Expenses as PDF`}
    </Button>
  );
};

export default DownloadPDFButton;
