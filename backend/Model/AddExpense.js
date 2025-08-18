import mongoose, { Types } from "mongoose";

const AddExpenseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    time: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "member",
    },
  },
  { timestamps: true }
);

export const AddExpense = mongoose.model("AddExpense", AddExpenseSchema);
