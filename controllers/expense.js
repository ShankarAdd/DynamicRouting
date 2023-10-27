const Expense = require('../models/expense');

exports.addexpense = (req,res,next) =>{
    const {expenseId,amount,description,category} = req.body;
    if(expenseId == 0){
      Expense.create({
        amount: amount,
        description: description,
        category: category
    })
    .then(result =>{
        res.json(result);
    })
    .catch(err => console.log(err));
    }else{
      Expense.create({
          amount: amount,
          description: description,
          category: category
      })
      .then(result =>{
          res.json(result);
      })
      .catch(err => console.log(err));
    }
}
exports.getExpense = (req,res,next) =>{
    Expense.findAll()
    .then(result =>{
        res.json(result);
    })
    .catch(err => console.log(err));
}

exports.deleteExpense = (req,res,next) =>{
    const id=req.params.id;
    Expense.destroy({
      where: 
      {
        id:id
      }
    })
    .then(deletedUser =>{
      res.json(deletedUser)
    })
    .catch(err =>console.log(err));
  }
