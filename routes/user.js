const userController = require('../controllers/user');

const express = require('express');

const router = express.Router();

router.post('/add-user', userController.addUser);

router.get('/get-user',userController.getUsersFromDB);

router.delete('/delete-user/:id',userController.deleteUserById)

module.exports =router;