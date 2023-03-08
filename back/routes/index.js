const express = require("express");
const router = express.Router();
const usersRouter = require("./usersRoutes");
const productRouter = require("./productRoutes");
const searchRouter = require("./searchRouter");

router.use("/users", usersRouter);
router.use("/products", productRouter);
router.use("/search", searchRouter);
module.exports = router;
