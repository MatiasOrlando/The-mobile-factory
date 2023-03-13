const express = require("express");
const productRouter = express.Router();
const productsController = require("../controllers/productsController");

productRouter.get("/", productsController.listAllProducts);
productRouter.get("/:id", productsController.listSingleProduct);

module.exports = productRouter;
