import React, { useState } from "react";

const DownloadPDFButton = ({ filter, currentMonth }) => {
  const [loading,setLoading]=useState(false)
  const downloadPDF = async () => {
     setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("filter", filter);

      if (filter === "month") {
        params.append("month", currentMonth.getMonth());
        params.append("year", currentMonth.getFullYear());
      }

      const res = await fetch(`http://localhost:3001/api/expense/pdf?${params.toString()}`, {
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
