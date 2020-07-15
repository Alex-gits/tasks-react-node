const Task = require('../models/taskModel');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).json({
      status: 'success',
      results: tasks.length,
      tasks
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error: error.message
    });
  }
};

exports.addNewTask = async (req, res) => {
  try {
    const newTask = await Task.create(req.body);

    res.status(201).json({
      status: 'success',
      task: newTask
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error: error.message
    });
  }
};

exports.editTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        status: 'fail',
        message: `Task with id of ${req.params.id} was not found`
      });
    }

    if (title) {
      task.title = title;
    } else {
      task.description = description;
    }

    await task.save();

    res.status(200).json({
      status: 'success',
      task
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error: error.message
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        status: 'fail',
        message: `Task with id of ${req.params.id} was not found`
      });
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error: error.message
    });
  }
};
