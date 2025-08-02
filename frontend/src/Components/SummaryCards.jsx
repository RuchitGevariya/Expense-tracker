import React from "react";
import { useTranslation } from "react-i18next";

const SummaryCards = ({
  weeklyTotal = 0,
  monthlyTotal = 0,
  yearlyTotal = 0,
}) => {
  const { t } = useTranslation();

  const safeWeekly = Number(weeklyTotal) || 0;
  const safeMonthly = Number(monthlyTotal) || 0;
  const safeTotal = Number(yearlyTotal) || 0;

  return (
    <div className="summary-cards">
      <div className="summary-card">
        <h2>{t("summary.weeklyTitle")}</h2>
        <div className="amount">₹{safeWeekly.toFixed(2)}</div>
        <div className="period">{t("summary.weeklyPeriod")}</div>
      </div>
      <div className="summary-card">
        <h2>{t("summary.monthlyTitle")}</h2>
        <div className="amount secondary">₹{safeMonthly.toFixed(2)}</div>
        <div className="period">{t("summary.monthlyPeriod")}</div>
      </div>
      <div className="summary-card">
        <h2>{t("summary.totalTitle")}</h2>
        <div className="amount">₹{safeTotal.toFixed(2)}</div>
        <div className="period">{t("summary.totalPeriod")}</div>
      </div>
    </div>
  );
};

export default SummaryCards;
