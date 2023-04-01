const express = require('express');
const router = new express.Router();
const authManager = require('../middleware/authManager');
const { register, login, logout } = require('../middleware/auth');
const getAllUsers = require('../controllers/Task_Management_Controllers/getAllUsers');
const getTeamMembers = require('../controllers/Task_Management_Controllers/getTeamMembers');
const checkLogin = require('../controllers/Login_Register_Controllers/checkLogin');
const getUserFromTaskUserId = require('../controllers/Task_Management_Controllers/getUserFromTaskUserId');

router.post('/', checkLogin) //endpoint for the client-side token verification on automatic logins 

router.get('/users', authManager, getAllUsers);

router.get('/users/team', authManager, getTeamMembers);

router.get('/users/tasks/all', authManager, getUserFromTaskUserId);

router.post('/login', login);

router.post('/logout', logout);

router.post('/register', register); //the Technicians can register themselves but they have to enter a valid manager e-mail

module.exports = router;