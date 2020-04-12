const Task = require('./task.model');

let tasks = [];

const checkTask = async taskObj => {
  if (tasks.length === 0) return false;
  const { id } = taskObj;
  if (id) {
    return await tasks.some(el => el.id === id);
  }
  return false;
};

const getAll = async id => {
  const allTasks = await tasks.filter(el => el.boardId === id);
  return allTasks;
};

const getTask = async id => {
  const task = await tasks.filter(el => el.id === id);
  return task[0];
};

const addTask = async taskObj => {
  const newTask = await new Task(
    taskObj.title,
    taskObj.order,
    taskObj.description,
    taskObj.userId,
    taskObj.boardId,
    taskObj.columnId
  );
  tasks.push(newTask);
  return newTask;
};

const updateTask = async data => {
  tasks.forEach(el => {
    if (el.id === data.id) {
      if (data.title) {
        el.title = data.title;
      }
      if (data.order) {
        el.order = data.order;
      }
      if (data.description) {
        el.description = data.description;
      }
      if (data.userId) {
        el.userId = data.userId;
      }
      if (data.boardId) {
        el.boardId = data.boardId;
      }
      if (data.columnId) {
        el.columnId = data.columnId;
      }
    }
  });
  return await getTask(data.id);
};

const deleteTask = async TaskId => {
  tasks = tasks.filter(el => el.id !== TaskId);
};

const deleteAllBoardTasks = async boardId => {
  tasks = tasks.filter(el => el.boardId !== boardId);
};

const nullAllUserTask = async userId => {
  for (const task of tasks) {
    if (task.userId === userId) {
      task.userId = null;
    }
  }
};

module.exports = {
  getAll,
  addTask,
  getTask,
  checkTask,
  updateTask,
  deleteTask,
  deleteAllBoardTasks,
  nullAllUserTask,
  tasks
};
