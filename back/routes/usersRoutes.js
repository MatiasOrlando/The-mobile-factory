const express = require("express");
const userRouter = express.Router();
const { Customer } = require("../models/index");
const { validateUser } = require("../middleware/auth");
const { generateToken } = require("../config/token");

userRouter.post("/register", (req, res) => {
  const emailGod = "owner@mail.com"
  if (req.body.email === emailGod) {
    req.body.owner = true;
    req.body.admin = true;
    Customer.create(req.body)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch(() => res.send(404));
  } else {
    Customer.create(req.body)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch(() => res.send(404));
  }
});

userRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  Customer.findOne({
    where: {
      email: email,
    },
  })
    .then((user) => {
      if (!user) return res.send(404);
      const { email, full_name, id } = user;
      user.validatePassword(password).then((valid) => {
        if (!valid) {
          return res.send(401);
        } else {
          const token = generateToken({ email, full_name, id });
          res.cookie("token", token);
          res.send(user);
        }
      });
    })
    .catch(() => console.log("error"));
});

userRouter.post("/logout", (req, res, next) => {
  res.clearCookie("token").send();
});

userRouter.put("/:id", (req, res) => {
  const id = req.params.id;
  Customer.update(req.body, { where: { id }, returning: true })
    .then(([rowsAffected, user]) => {
      if (!user[0]) {
        res.status(404).send("User not found");
      }
      const userUpdate = user[0];
      res.send(userUpdate);
    })
    .catch(console.log);
});

userRouter.get("/me", validateUser, (req, res) => {
  res.send(req.user);
});

module.exports = userRouter;
