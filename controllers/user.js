const User = require('../models/user');

exports.addUser = (req, res, next) => {
  const {id,userName,userEmail} = req.body;
  console.log(userEmail);
  if(id === 0){
    User.create({
      userName: userName,
      userEmail: userEmail
    })
    .then(result =>{
      res.json(result);
    })
    .catch(err => console.log(err));
  }else{
    User.create({
      userName: userName,
      userEmail: userEmail
    })
    .then(result =>{
      res.json(result);
    })
    .catch(err => console.log(err));
  }
};

exports.getUsersFromDB = (req,res,next) =>{
  User.findAll().then(usersFrDB =>{
    res.json(usersFrDB)
  }).catch(err =>console.log(err))
}
exports.deleteUserById = (req,res,next) =>{
  const id=req.params.id;
  User.destroy({
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

