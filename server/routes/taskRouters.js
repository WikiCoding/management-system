const express = require('express');
const router = new express.Router();
const getAllTasks = require('../controllers/Task_Management_Controllers/getAllTasks');
const addTask = require('../controllers/Task_Management_Controllers/addTask');
const authManager = require('../middleware/authManager');
const authTechnincian = require('../middleware/authTechnician');
const checkUserTask = require('../controllers/Task_Management_Controllers/checkUserTask');
const { updateTaskCompletion, updateTaskDescription } = require('../controllers/Task_Management_Controllers/updateTask');
const deleteTask = require('../controllers/Task_Management_Controllers/deleteTask');
const getUserTasks = require('../controllers/Task_Management_Controllers/getUserTasks');

router.get('/tasks/user/:id', authTechnincian, getUserTasks);

router.get('/tasks', authManager, getAllTasks);

router.post('/tasks/add', authTechnincian, addTask);

router.patch('/tasks/completion/:id', authTechnincian, checkUserTask, updateTaskCompletion);

router.patch('/tasks/description/:id', authTechnincian, checkUserTask, updateTaskDescription);

router.delete('/tasks/delete/:id', authManager, deleteTask);

module.exports = router;