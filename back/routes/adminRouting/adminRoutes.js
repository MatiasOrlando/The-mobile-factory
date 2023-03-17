const express = require("express");
const adminRouter = express.Router();
const adminUsersRoutes = require("./adminUsersRoutes");
const adminProductsRoutes = require("./adminProductsRoutes");
const adminCategoryRoutes = require("./adminCategoryRoutes");

adminRouter.use("/users", adminUsersRoutes);
adminRouter.use("/products", adminProductsRoutes);
adminRouter.use("/category", adminCategoryRoutes);

module.exports = adminRouter;
