const express = require("express");
const router = express.Router();

const usersRouter = require("./usersRoutes");
const productRouter = require("./productRoutes");
const searchRouter = require("./searchRoutes");
const carritoRouter = require("./carritoRoutes");
const checkoutRouter = require("./checkoutRoutes")
const adminRoutes = require("./adminRouting/adminRoutes");


router.use("/users", usersRouter);
router.use("/products", productRouter);
router.use("/search", searchRouter);
router.use("/carrito", carritoRouter);
router.use("/admin", adminRoutes);
router.use("/checkout", checkoutRouter);


module.exports = router;
