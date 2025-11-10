const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// GET all expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 }); // -1 means newest first
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single expense by ID
router.get("/:id", async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new expense
router.post("/", async (req, res) => {
  const expense = new Expense({
    description: req.body.description,
    amount: req.body.amount,
    category: req.body.category,
    date: req.body.date || Date.now(),
  });

  try {
    const newExpense = await expense.save();
    res.status(201).json(newExpense); // 201 means "created"
  } catch (error) {
    res.status(400).json({ message: error.message }); // 400 means "bad request"
  }
});

// PUT update expense
router.put("/:id", async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Update fields if provided
    if (req.body.description) expense.description = req.body.description;
    if (req.body.amount) expense.amount = req.body.amount;
    if (req.body.category) expense.category = req.body.category;
    if (req.body.date) expense.date = req.body.date;

    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE expense
router.delete("/:id", async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    await expense.deleteOne();
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET expense statistics
router.get("/stats/summary", async (req, res) => {
  try {
    const expenses = await Expense.find();

    // Calculate total
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    // Calculate by category
    const byCategory = {};
    expenses.forEach((expense) => {
      if (byCategory[expense.category]) {
        byCategory[expense.category] += expense.amount;
      } else {
        byCategory[expense.category] = expense.amount;
      }
    });

    res.json({
      total: total.toFixed(2),
      count: expenses.length,
      byCategory,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
