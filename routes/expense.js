const expenseController = require('../controllers/expense');

const express = require('express');

const router = express.Router();

router.post('/add-expense', expenseController.addexpense);

router.get('/get-expense',expenseController.getExpense);

router.delete('/delete-expense/:id',expenseController.deleteExpense);

module.exports =router;