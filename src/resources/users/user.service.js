const User = require('./user.schema');
const { nullUserTasks } = require('../tasks/tasks.service');

const updateUser = async (userId, newUserData) => {
  const user = await User.findByIdAndUpdate(userId, newUserData);
  return user;
};

const getAll = async () => {
  const q = await User.find({});
  return q;
};

const getUser = async id => {
  const user = await User.findById(id);
  return user;
};

const addUser = async newUserObj => {
  const newUser = await User.create(newUserObj);
  return newUser;
};

const deleteUser = async userId => {
  const q = await User.findByIdAndRemove(userId);
  await nullUserTasks(userId);
  return q;
};

const toResponse = async userObj => {
  const { id, name, login } = userObj;
  return {
    id,
    name,
    login
  };
};

module.exports = {
  getAll,
  addUser,
  getUser,
  updateUser,
  deleteUser,
  toResponse
};
