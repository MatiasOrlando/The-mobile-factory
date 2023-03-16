const express = require("express");
const adminCategoryRoutes = express.Router();
const { Customer, Brand } = require("../../models");

adminCategoryRoutes.post("/add", async (req, res) => {

  const {id, name, description} = req.body;

  try {
    const userPrivileged = await Customer.findByPk(id);
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
  
  const {name, id} = req.query
  
  try {
    const userPrivileged = await Customer.findByPk(id);
    if (userPrivileged.dataValues.owner || userPrivileged.dataValues.admin) {
      const categorySelectedDelete = await Brand.findOne({
        where: { name: name.toLowerCase() },
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
  
  const {id} = req.query 
  try {
    const userPrivileged = await Customer.findByPk(parseInt(id));
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
 
  const {id, previousName, newName, newDescription} = req.body;
  
  try {
    const userPrivileged = await Customer.findByPk(id);
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
