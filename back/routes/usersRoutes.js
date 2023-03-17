const express = require("express");
const userRouter = express.Router();
const { validateUser } = require("../middleware/auth");
const usersController = require("../controllers/usersController");

userRouter.post("/register", usersController.registerUser);
userRouter.post("/login", usersController.logInUser);
userRouter.put("/:id", usersController.updateUser);
userRouter.get("/me", validateUser, usersController.userPersist);
userRouter.post("/logout", usersController.logOut);
module.exports = userRouter;
