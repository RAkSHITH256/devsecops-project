const Task = require('../models/Task');

exports.getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.json(tasks);
    } catch (error) {
        next(error);
    }
};

exports.createTask = async (req, res, next) => {
    try {
        const { title, description, status } = req.body;
        if (!title || !description) {
            res.status(400);
            throw new Error('Please provide title and description');
        }
        const task = await Task.create({
            title,
            description,
            status: status || 'pending',
            user: req.user._id
        });
        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
};

exports.updateTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            res.status(404);
            throw new Error('Task not found');
        }
        if (task.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('User not authorized');
        }
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTask);
    } catch (error) {
        next(error);
    }
};

exports.deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            res.status(404);
            throw new Error('Task not found');
        }
        if (task.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('User not authorized');
        }
        await task.deleteOne();
        res.json({ message: 'Task removed' });
    } catch (error) {
        next(error);
    }
};

exports.getDashboardStats = async (req, res, next) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        const total = tasks.length;
        const completed = tasks.filter(t => t.status === 'completed').length;
        const pending = tasks.filter(t => t.status === 'pending').length;
        const inProgress = tasks.filter(t => t.status === 'in-progress').length;
        res.json({ total, completed, pending, inProgress });
    } catch (error) {
        next(error);
    }
};
