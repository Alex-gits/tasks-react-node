const mongoose = require('mongoose');
const slugify = require('slugify');

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A task must have a name'],
    minlength: [3, 'Title must have more or equal than 3 characters'],
    maxlength: [30, 'Title must have less or equal than 30 characters'],
    trim: true
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'A task must have a description'],
    minlength: [5, 'A task must have more or equal than 5 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

taskSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });

  next();
});

taskSchema.pre('findByIdAndUpdate', function (next) {
  this.slug = slugify(this.title, { lower: true });

  next();
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
