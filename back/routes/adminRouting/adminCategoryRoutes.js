const express = require("express");
const adminCategoryRoutes = express.Router();
const { Customer, Brand } = require("../../models");

adminCategoryRoutes.post("/add", async (req, res) => {
  // Por req.body recibimos idUsuario , idCategory, nombre y descripcion
  // const idCategory = "Motorola"; A CHEQUEAR
  const idUser = 1;
  const name = "Celulares Google";
  const description = "tdadadat";

  try {
    const userPrivileged = await Customer.findByPk(idUser);
    if (userPrivileged.dataValues.owner || userPrivileged.dataValues.admin) {
      const [item, created] = await Brand.findOrCreate({
        where: {
          name,
        },
        defaults: { name, description },
      });
      if (!created) return res.status(404).send(`Category already exists`);
      res.status(200).send(item);
    } else {
      res.status(404).send(`You must have owner or admin privileges`);
    }
  } catch {
    res.status(404).send(`Currently unavailable to add categorys`);
  }
});

adminCategoryRoutes.delete("/delete", async (req, res) => {
  // Por req.body recibimos idUsuario , y nombre de la categoria
  const idUser = 1;
  const name = "Celulares Iphone";
  try {
    const userPrivileged = await Customer.findByPk(idUser);
    if (userPrivileged.dataValues.owner || userPrivileged.dataValues.admin) {
      const categorySelectedDelete = await Brand.findOne({
        where: { name: name },
      });
      if (categorySelectedDelete) {
        await Brand.destroy({ where: { name } });
        res.status(200).send(categorySelectedDelete);
      } else {
        res
          .status(404)
          .send(`Name provided do not match with any existing Category`);
      }
    } else {
      res
        .status(404)
        .send(`You must have owner or admin privileges to delete Categorys`);
    }
  } catch {
    res.status(404).send(`Currently unavailable to delete categorys`);
  }
});

adminCategoryRoutes.get("/getCategorys", async (req, res) => {
  // Recibimos id de usuario para validar privilegios
  const idUser = 1;
  try {
    const userPrivileged = await Customer.findByPk(idUser);
    if (userPrivileged.dataValues.owner || userPrivileged.dataValues.admin) {
      const allCategorys = await Brand.findAll();
      allCategorys && res.status(200).send(allCategorys);
    } else {
      res
        .status(404)
        .send(`You must have owner or admin privileges to see all Categorys`);
    }
  } catch {
    res.status(404).send(`Currently unavailable to see all Categorys`);
  }
});

adminCategoryRoutes.put("/edit", async (req, res) => {
  // Recibimos id de usuario para validar privilegios, y el body del contenido a actualizar
  const idUser = 1;
  const previousName = "celulares SAMSUNG";
  const newName = "celulares NOKIA";
  const newDescription = "hola";
  try {
    const userPrivileged = await Customer.findByPk(idUser);
    if (userPrivileged.dataValues.owner || userPrivileged.dataValues.admin) {
      const [extras, updatedCategory] = await Brand.update(
        {
          name: newName.toLowerCase(),
          description: newDescription,
        },
        {
          where: { name: previousName.toLowerCase() },
          returning: true,
        }
      );
      res.send(updatedCategory[0]);
    } else {
      res
        .status(404)
        .send(`You must have owner or admin privileges to edit Categorys`);
    }
  } catch {
    res.status(404).send(`Currently unavailable to see edit Categorys`);
  }
});

module.exports = adminCategoryRoutes;
