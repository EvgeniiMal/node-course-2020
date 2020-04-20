const Task = require('./task.schema');

const getAll = async boardId => {
  const tasks = await Task.find({ boardId });
  return tasks.map(toResponse);
};

const getTask = async id => {
  const task = await Task.findById(id);
  if (task) {
    return toResponse(task);
  }
  return undefined;
};

const addTask = async taskObj => {
  const newTask = await Task.create(taskObj);
  return toResponse(newTask);
};

const updateTask = async (id, data) => {
  const task = await Task.findByIdAndUpdate(id, data);
  return toResponse(task);
};

const deleteTask = async id => {
  const deleted = await Task.findByIdAndDelete(id);
  return deleted;
};

const toResponse = task => {
  const { id, title, order, description, userId, boardId, columnId } = task;
  return { id, title, order, description, userId, boardId, columnId };
};

const nullUserTasks = async userId => {
  await Task.updateMany({ userId }, { userId: null });
};

const deleteBoardTasks = async boardId => {
  await Task.remove({ boardId });
};

module.exports = {
  getAll,
  addTask,
  getTask,
  updateTask,
  deleteTask,
  nullUserTasks,
  deleteBoardTasks
};
