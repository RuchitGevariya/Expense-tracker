import React, { useState } from "react";
import NPprogress from "nprogress"
import 'nprogress/nprogress.css';
import nprogress from "nprogress";
const DownloadPDFButton = ({ filter, currentMonth }) => {
 
  const [loading,setLoading]=useState(false)
  const downloadPDF = async () => {
     setLoading(true);
     nprogress.start()
    try {
      const params = new URLSearchParams();
      params.append("filter", filter);

      if (filter === "month") {
        params.append("month", currentMonth.getMonth());
        params.append("year", currentMonth.getFullYear());
      }

      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/expense/pdf?${params.toString()}`, {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to generate PDF");
      }

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
      alert("Failed to download PDF");
    }finally{
      setLoading(false)
      nprogress.done()
    }
  };

  return (
    <button
      onClick={downloadPDF}
      className="btn btn-primary"
      style={{ marginTop: "10px" }}
    >
    {loading? "Generating PDF...":  `Download ${filter === "all" ? "All" : filter.charAt(0).toUpperCase() + filter.slice(1)} Expenses as PDF`}
    </button>
  );
};

export default DownloadPDFButton;
