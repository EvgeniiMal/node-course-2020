const User = require('./user.model');

let users = [];

const checkUser = async userObj => {
  if (users.length === 0) return false;
  const { id, login } = userObj;
  if (id) {
    return await users.some(el => el.id === id);
  } else if (login) {
    return await users.some(el => el.login === login);
  }
};

const getAll = async () => {
  const allUsers = users;
  return allUsers;
};

const getUser = async id => {
  const user = await users.filter(el => el.id === id)[0];
  return user;
};

const addUser = async (name, login, pass) => {
  const newUser = await new User(name, login, pass);
  users.push(newUser);
  return newUser;
};

const updateUser = async data => {
  await users.forEach(el => {
    if (el.id === data.id) {
      if (data.name) {
        el.name = data.name;
      }
      if (data.login) {
        el.login = data.login;
      }
      if (data.password) {
        el.password = data.password;
      }
    }
  });
  return await getUser(data.id);
};

const deleteUser = async userId => {
  users = users.filter(el => el.id !== userId);
  return 204;
};

module.exports = {
  getAll,
  addUser,
  getUser,
  checkUser,
  updateUser,
  deleteUser
};
