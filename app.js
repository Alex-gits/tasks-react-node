const fs = require('fs');
const express = require('express');

const morgan = require('morgan');

const taskRouter = require('./routes/taskRoutes');

const app = express();

// Middlewares
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/tasks', taskRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

module.exports = app;
