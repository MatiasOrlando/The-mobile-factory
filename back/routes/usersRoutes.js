const express = require("express")
const userRouter = express.Router()
const { Customer } = require("../models/index")
const { validateUser } = require("../middleware/auth")
const { generateToken } = require("../config/token")

userRouter.post("/register", (req, res) => {
    console.log(req.body);
    Customer.create(req.body).then(user => {
        console.log(user);
        res.status(201).send(user)
    }).catch(() => res.send(404));
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
            console.log(user);
            let { email, name, lastName, id } = user;
            user.validatePassword(password).then((valid) => {
                if (!valid) {
                    return res.send(401);
                } else {
                    let token = generateToken({ email, name, lastName, id });
                    return res.cookie("token", token).send(user);
                }
            });
        })
        .catch(() => console.log("error"));
});

userRouter.post("/logout", (req, res, next) => {
    res.clearCookie("token").sendStatus(204);
});

userRouter.put("/:id", (req, res) => {
    const id = req.params.id
    Customer.update(req.body, { where: { id }, returning: true }).then(([rowsAffected, user]) => {
        if (!user[0]) {
            res.status(404).send("User not found")
        }
        const userUpdate = user[0]
        res.send(userUpdate);
    }).catch(console.log)
})

userRouter.get("/me", validateUser, (req, res) => {
    res.send(req.user);
});

module.exports = userRouter;