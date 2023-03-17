const UsersService = require("../services/users");
const { generateToken } = require("../config/token");

const registerUser = async (req, res) => {
  try {
    const newUser = await UsersService.userRegister(req.body);
    res.status(201).send(newUser);
  } catch {
    res.status(404).send(`ERROR registration`);
  }
};

const logInUser = async (req, res) => {
  const { password } = req.body;
  try {
    const userLogged = await UsersService.userLogIn(req.body);
    if (!userLogged) return res.send(404);
    const { email, full_name, id } = userLogged;
    const validUser = await userLogged.validatePassword(password);
    if (!validUser) return res.send(401);
    const token = generateToken({ email, full_name, id });
    res.cookie("token", token);
    res.send(userLogged);
  } catch (error) {
    res.status(404).send(`Error log in user`);
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await UsersService.userUpdate(req.body, req.params);
    res.status(201).send(updatedUser);
  } catch (error) {
    res.status(404).send(`Error update user`);
  }
};

const logOut = async (req, res) => {
  try {
    res.clearCookie("token").send(`User Logged Out`);
  } catch (error) {
    res.status(404).send(`Error logout user`);
  }
};

const userPersist = async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(404).send(`Invalid token`);
  }
};

module.exports = { registerUser, logInUser, updateUser, userPersist, logOut };
