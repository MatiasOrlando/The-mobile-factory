const express = require("express");
const router = express.Router();
const usersRouter = require("./usersRoutes");
const carritoRouter = require("./carritoRoutes");

router.use("/users", usersRouter);

router.use("/carrito", carritoRouter);



module.exports = router;