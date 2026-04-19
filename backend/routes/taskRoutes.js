const express = require('express');
const { getTasks, createTask, updateTask, deleteTask, getDashboardStats } = require('../controllers/taskController');
const { protect } = require('../middleware/auth');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management API
 */

router.route('/')
    .get(protect, getTasks)
    .post(protect, createTask);

router.route('/stats')
    .get(protect, getDashboardStats);

router.route('/:id')
    .put(protect, updateTask)
    .delete(protect, deleteTask);

module.exports = router;
