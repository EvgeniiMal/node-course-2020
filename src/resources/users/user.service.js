const usersRepo = require('./user.memory.repository');

const checkUser = async obj => await usersRepo.checkUser(obj);

const updateUser = async data => await usersRepo.updateUser(data);

const getAll = async () => await usersRepo.getAll();

const getUser = async id => await usersRepo.getUser(id);

const addUser = async (name, login, password) => {
  const newUser = await usersRepo.addUser(name, login, password);
  return newUser;
};

const deleteUser = async id => await usersRepo.deleteUser(id);

module.exports = {
  getAll,
  addUser,
  getUser,
  checkUser,
  updateUser,
  deleteUser
};
