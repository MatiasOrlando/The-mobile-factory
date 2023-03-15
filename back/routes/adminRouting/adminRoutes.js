const express = require("express");
const adminRouter = express.Router();
const adminUsersRoutes = require("./adminUsersRoutes");
const adminProductsRoutes = require("./adminProductsRoutes");

adminRouter.use("/users", adminUsersRoutes);
adminRouter.use("/products", adminProductsRoutes);

module.exports = adminRouter;
