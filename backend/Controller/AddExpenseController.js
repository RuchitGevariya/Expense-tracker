import { AddExpense } from "../Model/AddExpense.js";
import pdf from "html-pdf-node";
import mongoose from "mongoose";
export async function HandleAddexpense(req, res) {
  try {
    const { date, time, name, amount } = req.body;
    if (!date || !time || !name || !amount || !req.user) {
      res
        .status(400)
        .json({ success: "false", message: "all filed are requried" });
    }
    await AddExpense.create({
      date,
      time,
      name,
      amount,
      user: req.user.id,
    });
    res.status(201).json({ success: true, message: "new expense created" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(error);
  }
}
export async function GetFilterData(req, res) {
  try {
    const { filter, month, year } = req.query;
    const now = new Date();
    let startDate, endDate;

    if (filter === "week") {
      const day = now.getDay();
      const diffToMonday = (day === 0 ? -6 : 1) - day;

      startDate = new Date(now);
      startDate.setDate(now.getDate() + diffToMonday);
      startDate.setHours(0, 0, 0, 0);

      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      endDate.setHours(23, 59, 59, 999);
    } else if (filter === "month") {
      const m = parseInt(month);
      const y = parseInt(year);

      // ✅ Check if month and year are valid numbers
      if (!m || !y) {
        return res.status(400).json({ error: "Invalid month or year" });
      }
      startDate = new Date(y, m, 1);
      endDate = new Date(y, m + 1, 0, 23, 59, 59, 999);
    }

    let query = { user: req.user.id };
    if (startDate && endDate) {
      query.date = { $gte: startDate, $lte: endDate };
    }

    const expenses = await AddExpense.find(query).sort({ date: -1 });
    res.json({ data: expenses });
  } catch (err) {
    console.error("Error in GET /expense:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
export async function HandleExpenseUpdate(req, res) {
  try {
    const { id } = req.params;
    const { date, time, name, amount } = req.body;
    if (!date || !time || !name || !amount) {
      res
        .status(402)
        .json({ success: "false", message: "all filed are requried" });
    }

    const updated = await AddExpense.findByIdAndUpdate(
      id,
      { date, time, name, amount },
      { new: true }
    );
    res.json({ success: true, data: updated });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}
export async function HandleExpenseDelete(req, res) {
  try {
    const deleted = await AddExpense.findByIdAndDelete(req.params.id);
    if (!deleted) {
     return res.status(404).json({ error: "Not Found" });
    }
  return  res.status(200).json({ success: true, messgage: "Deleted successfully" });
  } catch (error) {
  return  res.status(500).json({ error: "Server error" });
  }
}
export async function HandleYearTotal(req, res) {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const all = await AddExpense.aggregate([
      { $match: { user: userId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.json({ total: all[0]?.total || 0 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}

export async function HandleMonthTotal(req, res) {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const now = new Date();
    const startDateOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endDateofMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59
    );
    const result = await AddExpense.aggregate([
      {
        $match: {
          user: userId,
          date: { $gte: startDateOfMonth, $lte: endDateofMonth },
        },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.json({ total: result[0]?.total || 0 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}

export async function HandleWeeklyTotal(req, res) {
  try{
  const userId = new mongoose.Types.ObjectId(req.user.id);
  const now = new Date();
  const dayofweek = now.getDay();
  const diffToMonday = (dayofweek === 0 ? -6 : 1) - dayofweek;
  const startofWeek = new Date(now);
  startofWeek.setDate(now.getDate() + diffToMonday);
  startofWeek.setHours(0, 0, 0, 0);

  const endofWeek = new Date(now);
  endofWeek.setDate(startofWeek.getDate() + 6);
  endofWeek.setHours(23, 59, 59);

  const weekly = await AddExpense.aggregate([
    { $match: { user: userId, date: { $gte: startofWeek, $lte: endofWeek } } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);
  res.json({ total: weekly[0]?.total || 0 });

  }catch(error){
     console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}

export async function GetPdf(req,res) {
    const { filter, month, year } = req.query;
  const now = new Date();
  let startDate, endDate;

  if (filter === "week") {
    const day = now.getDay();
    const diffToMonday = (day === 0 ? -6 : 1) - day;
    startDate = new Date(now);
    startDate.setDate(now.getDate() + diffToMonday);
    startDate.setHours(0, 0, 0, 0);
    endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    endDate.setHours(23, 59, 59, 999);
  } else if (filter === "month") {
    const m = parseInt(month);
    const y = parseInt(year);
    if (!m || !y) return res.status(400).json({ error: "Invalid month/year" });

    startDate = new Date(y, m, 1);
    endDate = new Date(y, m + 1, 0, 23, 59, 59, 999);
  }

  let query = { user: req.user.id };
  if (startDate && endDate) {
    query.date = { $gte: startDate, $lte: endDate };
  }

  const expenses = await AddExpense.find(query).sort({ date: -1 });
const totalAmount=expenses.reduce((acc,e)=>acc+e.amount,0)
  const html = `
    <html>
    <head>
      <style>
        body { font-family: Arial; padding: 20px; }
        h1 { color: #4361ee; text-align: center; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 10px; border: 1px solid #ddd; }
        th { background: #f4f4f4; }
      </style>
    </head>
    <body>
      <h1>${filter.toUpperCase()} Expense Report</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th><th>Time</th><th>Name</th><th>Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          ${expenses
            .map(
              (e) => `
              <tr>
                <td>${new Date(e.date).toLocaleDateString()}</td>
                <td>${e.time}</td>
                <td>${e.name}</td>
                <td>₹${e.amount.toFixed(2)}</td>
              </tr>`
            )
            .join("")}
        </tbody>
        <tfoot>
        <tr>
          <td colspan="3" style="text-align:right;">Total:</td>
          <td>₹${totalAmount.toFixed(2)}</td>
        </tr>
      </tfoot>
      </table>
    </body>
    </html>
  `;

  const file = { content: html };

  pdf.generatePdf(file, { format: "A4" }).then((pdfBuffer) => {
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${filter}_expense.pdf`
    );
    res.send(pdfBuffer);
  });

}
