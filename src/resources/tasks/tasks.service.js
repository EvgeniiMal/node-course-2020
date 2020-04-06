const tasksRepo = require('./task.memory.repository');

const checkTask = async obj => await tasksRepo.checkTask(obj);

const updateTask = async data => await tasksRepo.updateTask(data);

const getAll = async id => await tasksRepo.getAll(id);

const getTask = async id => await tasksRepo.getTask(id);

const addTask = async taskObj => {
  const newTask = await tasksRepo.addTask(taskObj);
  return newTask;
};

const deleteTask = async id => await tasksRepo.deleteTask(id);

module.exports = {
  getAll,
  addTask,
  getTask,
  checkTask,
  updateTask,
  deleteTask
};
