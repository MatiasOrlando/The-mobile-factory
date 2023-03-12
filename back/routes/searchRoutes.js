const express = require("express");
const searchRouter = express.Router();
const productsController = require("../controllers/productsController");

searchRouter.get("/", productsController.listQueryProducts);

module.exports = searchRouter;
