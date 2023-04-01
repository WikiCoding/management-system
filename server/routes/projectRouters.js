const express = require('express');
const router = new express.Router();
const getProjects = require('../controllers/Project_Planner_Controllers/getProjects');
const createProject = require('../controllers/Project_Planner_Controllers/createProject');
const deleteProject = require('../controllers/Project_Planner_Controllers/deleteProject');
const getHolidays = require('../controllers/Project_Planner_Controllers/getHolidays');
const getProjTasks = require('../controllers/Project_Planner_Controllers/getProjectTasks');
const createProjectTask = require('../controllers/Project_Planner_Controllers/createProjectTask');
const deleteProjectTask = require('../controllers/Project_Planner_Controllers/deleteProjectTask');
const getProjectByTitle = require('../controllers/Project_Planner_Controllers/getProjectByTitle');
const getProjTaskEndDate = require('../controllers/Project_Planner_Controllers/getProjectTaskEndDate');
const updateProjectTaskCompleted = require('../controllers/Project_Planner_Controllers/updateProjectTaskComplete');

router.get('/projects', getProjects);

router.get('/projects/:proj_title', getProjectByTitle);

router.get('/projects/tasks/:proj_title', getProjTasks);

router.get('/projects/tasks/id/:id_proj_tasks', getProjTaskEndDate);

router.get('/projects/holiday/:proj_title', getHolidays);

router.post('/projects', createProject);

router.post('/projects/tasks/create/:proj_title', createProjectTask);

router.patch('/projects/tasks/update/complete/:id', updateProjectTaskCompleted);

router.delete('/projects/delete/:id', deleteProject);

router.delete('/projects/tasks/delete/:id', deleteProjectTask);

module.exports = router;