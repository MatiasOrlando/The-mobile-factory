const express = require("express");
const adminProductsRoutes = express.Router();
const { Product, Customer } = require("../../models");

adminProductsRoutes.delete("/delete-product", async (req, res) => {
  // Me envian por body el id del producto y el id del usuario que quiere borrar dicho producto para validar sus privilegios
  // const {idProduct , id} = req.body
  const id = 1;
  const idProduct = 645;
  try {
    const userPrivileged = await Customer.findByPk(id);
    const productToDelete = await Product.findByPk(idProduct);
    if (
      (userPrivileged.dataValues.owner || userPrivileged.dataValues.admin) &&
      productToDelete
    ) {
      await Product.destroy({ where: { id: idProduct } });
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
  // Me envian por body y todos los datos necesarios para crear un Product y el id del usuario que quiere agregar
  // const { idUser, name, price, color, display_size, info, images, year, storage, amountCores, stock } = req.body
  const name = "Motorola v3";
  const price = "100€";
  const color = "black";
  const display_size = "4.5''";
  const info = "test";
  const year = 2010;
  const storage = "64gb";
  const amountCores = "8";
  const stock = 1;
  const idUser = 1;
  const images = [];
  try {
    const userPrivileged = await Customer.findByPk(idUser);
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
  // Debo recibir id de usuario para identificar privilegios
  // Debo recibir id de producto para identificar el producto a editar
  // Idealmente recibir los ids de producto y usuario por req.query
  // Debo recibir por body el nuevo contenido de dicho producto a editar.
  const idUser = 1;
  const idProduct = 639;
  const name = "Nokia 1100";
  const price = "10€";
  const color = "space-grey";
  const display_size = "3.5''";
  const info = "probando1234";
  const year = 2000;
  const storage = "16gb";
  const amountCores = "2";
  const stock = 5;
  const images = [
    "https://www.telecomweb.eu//Files/3/9000/9557/ProductPhotos/1000/18009753.jpg",
  ];
  try {
    const userPrivileged = await Customer.findByPk(idUser);
    if (
      (userPrivileged.dataValues.owner || userPrivileged.dataValues.admin) &&
      idProduct
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
        { where: { id: idProduct }, returning: true }
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
  // Debo recibir id de usuario para identificar privilegios por query
  // const {idUser} = req.query
  const idUser = 1;
  try {
    const userPrivileged = await Customer.findByPk(idUser);
    if (userPrivileged.dataValues.owner || userPrivileged.dataValues.admin) {
      const allProductsDb = await Product.findAll();
      res.status(200).send(allProductsDb);
    } else {
      res.status(404).send(`Invalid user privileges`);
    }
  } catch {
    res.status(404).send(`Invalid user`);
  }
});

module.exports = adminProductsRoutes;
