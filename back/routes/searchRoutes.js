const express = require("express");
const searchRouter = express.Router();
const productsController = require("../controllers/productsController");
const { Product, Brand } = require("../models");

searchRouter.get("/", productsController.listQueryProducts);

searchRouter.get("/category/:category", async (req, res) => {
    const {category} = req.params;
    try {
        const filter = await Brand.findAll({where: {name: category}, include: {model: Product}})
        res.send(filter[0].dataValues.products)
    } catch (error) {
        res.status(404).send(`DATA NOT AVAILABLE : ${error}`);
    }
});

module.exports = searchRouter;
