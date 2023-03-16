const express = require("express");
const adminProductsRoutes = express.Router();
const { Product, Customer, Brand } = require("../../models");

adminProductsRoutes.delete("/delete-product", async (req, res) => {
  const {id, idProduct} = req.query;
  try {
    const userPrivileged = await Customer.findByPk(parseInt(id));
    const productToDelete = await Product.findByPk(parseInt(idProduct));
    if (
      (userPrivileged.dataValues.owner || userPrivileged.dataValues.admin) &&
      productToDelete
    ) {
      await Product.destroy({ where: { id: parseInt(idProduct) } });
      res.status(201).send(productToDelete);
    } else {
      !productToDelete
        ? res.status(404).send(`Product not found`)
        : res.status(404).send(`You must have owner/admin privileges`);
    }
  } catch {
    res.status(404).send(`Invalid User`);
  }
});

adminProductsRoutes.post("/add-product", async (req, res) => {

  const {idUser} = req.query;
  const {newProduct} = req.body;
  const {name, price, color, display_size, info, year, storage, amountCores, stock, images} = newProduct;
  const page = 130;
  try {
    const userPrivileged = await Customer.findByPk(parseInt(idUser));
    if (userPrivileged.dataValues.owner || userPrivileged.dataValues.admin) {
      const newProduct = await Product.findOrCreate({
        where: {
          api_id: Math.floor(Math.random() * 101),
          name,
          price,
          color,
          display_size,
          info,
          images,
          year,
          storage,
          amountCores,
          stock,
          page
        },
      });
      res.status(200).send(newProduct);
    } else {
      res.status(404).send(`Invalid user privileges`);
    }
  } catch {
    res.status(404).send(`Invalid user`);
  }
  
});

adminProductsRoutes.put("/edit-product", async (req, res) => {
  const {idUser, idProduct} = req.query;
  const {updated} = req.body;
  const {name, price, color, display_size, info, year, storage, amountCores, stock, images} = updated;
  try {
    const userPrivileged = await Customer.findByPk(parseInt(idUser));
    if (
      (userPrivileged.dataValues.owner || userPrivileged.dataValues.admin) &&
      parseInt(idProduct)
    ) {
      const [extras, updatedProduct] = await Product.update(
        {
          name,
          price,
          color,
          display_size,
          info,
          images,
          year,
          storage,
          amountCores,
          stock,
        },
        { where: { id: parseInt(idProduct) }, returning: true }
      );
      res.send(updatedProduct[0]);
    } else {
      res.status(404).send(`Invalid user privileges`);
    }
  } catch {
    res.status(404).send(`Invalid user`);
  }
});

adminProductsRoutes.get("/allProducts", async (req, res) => {
 
  const {id} = req.query
  
  try {
    const userPrivileged = await Customer.findByPk(id);
    if (userPrivileged.dataValues.owner || userPrivileged.dataValues.admin) {
      const allProductsDb = await Product.findAll({include: {model: Brand}});
      res.status(200).send(allProductsDb);
    } else {
      res.status(404).send(`Invalid user privileges`);
    }
  } catch {
    res.status(404).send(`Invalid user`);
  }
});

module.exports = adminProductsRoutes;
