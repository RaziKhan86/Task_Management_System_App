const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        required: true
    }
});

const TaskModel = mongoose.model('todos', TaskSchema);
module.exports = TaskModel;