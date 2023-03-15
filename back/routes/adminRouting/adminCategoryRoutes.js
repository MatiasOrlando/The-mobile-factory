const express = require("express");
const adminCategoryRoutes = express.Router();
const { Product, Customer, Brand } = require("../../models");

adminCategoryRoutes.get("/test", (req, res) => {
  res.send(`Hola`);
});

module.exports = adminCategoryRoutes;
