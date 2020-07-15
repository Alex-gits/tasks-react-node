const express = require('express');

const {
  getAllTasks,
  addNewTask,
  editTask,
  deleteTask
} = require('../controllers/tasksController');

const router = express.Router();

router.route('/').get(getAllTasks).post(addNewTask);
router.route('/:id').patch(editTask).delete(deleteTask);

module.exports = router;
