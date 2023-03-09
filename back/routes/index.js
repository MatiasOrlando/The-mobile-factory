const express = require("express");
const router = express.Router();

const usersRouter = require("./usersRoutes");
const productRouter = require("./productRoutes");
const searchRouter = require("./searchRouter");
const carritoRouter = require("./carritoRoutes");

router.use("/users", usersRouter);
router.use("/products", productRouter);
router.use("/search", searchRouter);
router.use("/carrito", carritoRouter);

module.exports = router;
