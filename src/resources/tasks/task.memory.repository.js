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

const getAll = async () => {
  const allTasks = tasks;
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
      if (data.columns) {
        el.columns = data.columns;
      }
      if (data.password) {
        el.password = data.password;
      }
    }
  });
  return await getTask(data.id);
};

const deleteTask = async TaskId => {
  if (
    await checkTask({
      id: TaskId
    })
  ) {
    tasks = tasks.filter(el => el.id !== TaskId);
    return 204;
  }
  return 404;
};

module.exports = {
  getAll,
  addTask,
  getTask,
  checkTask,
  updateTask,
  deleteTask,
  tasks
};
