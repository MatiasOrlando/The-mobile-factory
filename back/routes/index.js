const express = require("express");
const router = express.Router();
const usersRouter = require("./usersRoutes");

router.use("/users", usersRouter);



module.exports = router;