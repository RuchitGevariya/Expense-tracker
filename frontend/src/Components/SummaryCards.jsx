import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Statistic } from "antd";
import CountUp from "react-countup"
import { ThemeContext } from "./Context/ThemeContext";
const SummaryCards = ({
  weeklyTotal = 0,
  monthlyTotal = 0,
  yearlyTotal = 0,
  totalMembers=0
}) => {
  const { t } = useTranslation();
const  {theme}=useContext(ThemeContext)
  const safeWeekly = Number(weeklyTotal) || 0;
  const safeMonthly = Number(monthlyTotal) || 0;
  const safeTotal = Number(yearlyTotal) || 0;
 const safeMembers=Number(totalMembers) ||0
  return (
<div className="summary-cards">
  <div className="summary-card">
    <h2>{t("summary.weeklyTitle")}</h2>
    <Statistic
      prefix="₹"
      value={safeWeekly}
      precision={2}
      valueStyle={{ fontSize: "1.8rem", fontWeight: "bold", color: "#1890ff" }}
       valueRender={()=>(
        <CountUp end={safeWeekly} decimal={2} duration={1.2}/>
      )}
    />
    <div className="period">{t("summary.weeklyPeriod")}</div>
  </div>

  <div className="summary-card">
    <h2>{t("summary.monthlyTitle")}</h2>
    <Statistic
      prefix="₹"
      value={safeMonthly}
      precision={2}
      valueStyle={{ fontSize: "1.8rem", fontWeight: "bold",color: "#1890ff" }}
      valueRender={()=>(
        <CountUp end={safeMonthly} decimal={2} duration={1.2}/>
      )}
    />
    <div className="period">{t("summary.monthlyPeriod")}</div>
  </div>
  
    <div className="summary-card">
    <h2>Total Members</h2>
    <Statistic
      value={safeMembers}
      valueStyle={{ fontSize: "1.8rem", fontWeight: "bold",color: "#1890ff"}}
      valueRender={()=>(
        <CountUp end={safeMembers}  duration={1.2}/>
      )}
    />
    <div className="period">You Have Added</div>
  </div>

  <div className="summary-card">
    <h2>{t("summary.totalTitle")}</h2>
    <Statistic
      prefix="₹"
      value={safeTotal}
      precision={2}
      valueStyle={{ fontSize: "1.8rem", fontWeight: "bold",color: "#1890ff"}}
      valueRender={()=>(
        <CountUp end={safeTotal} decimal={2} duration={1.2}/>
      )}
    />
    <div className="period">{t("summary.totalPeriod")}</div>
  </div>

</div>  );
};

export default SummaryCards;
