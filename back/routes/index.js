const express = require("express");
const router = express.Router();

const usersRouter = require("./usersRoutes");
const productRouter = require("./productRoutes");
const searchRouter = require("./searchRoutes");
const carritoRouter = require("./carritoRoutes");
const adminRoutes = require("./adminRoutes");

router.use("/users", usersRouter);
router.use("/products", productRouter);
router.use("/search", searchRouter);
router.use("/carrito", carritoRouter);
router.use("/admin", adminRoutes);

module.exports = router;
