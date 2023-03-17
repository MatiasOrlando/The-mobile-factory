const express = require("express");
const { Customer } = require("../../models");
const adminUsersRoutes = express.Router();
const mappedUsers = require("../../config/infoUsers");

adminUsersRoutes.put("/add", async (req, res) => {
  // NECESITO ID USUARIO OWNER Y EMAIL DEL USUARIO A CONVERTIR EN ADM
  // Se verifica primero con el ID que el usuario sea OWNER/ADM GOD para realizar cambios y luego ejecuta.
  // const {id, emailUser} = req.body
 /*  const id = 1;
  const email = "pepe@mail.com"; */

  const {id, email, old} = req.body;

  try {
    const validEmail = await Customer.findOne({ where: { email } });
    const userOwner = await Customer.findByPk(id);
    if (userOwner.dataValues.owner && validEmail) {
      const [extras, updatedUser] = await Customer.update(
        {
          admin: !old,
        },
        { where: { email }, returning: true }
      );
      res.status(201).send(updatedUser[0]);
    } else {
      !validEmail
        ? res.status(404).send(`User's email not found`)
        : res.status(404).send(`You must have owner privileges`);
    }
  } catch (error) {
    throw new Error(`Currently unavailable to add admins: ${error}`);
  }
});

adminUsersRoutes.get("/getUsers", async (req, res) => {
  // NECESITO ID USUARIO OWNER O ADMIN para verificar que pueda ver todos los usuarios por query
  const {id} = req.query
 
  /* const id = 1; */
  try {
    const userPrivileged = await Customer.findByPk(parseInt(id));
    if (userPrivileged.dataValues.owner || userPrivileged.dataValues.admin) {
      const allUsersData = await Customer.findAll();
      const arrayUsers = [];
      allUsersData.forEach((obj) => arrayUsers.push(obj.dataValues));
      const dataUsers = mappedUsers(arrayUsers);
      res.status(200).send(dataUsers);
    } else {
      res.status(404).send(`You must have owner/admin privileges`);
    }
  } catch (error) {
    throw new Error(`Currently unavailable to check all users: ${error}`);
  }
});

adminUsersRoutes.delete("/deleteUser", async (req, res) => {
  // NECESITO ID USUARIO OWNER Y EMAIL DEL USUARIO A BORRAR
  // Se verifica primero con el ID que el usuario sea OWNER/ADM GOD para realizar cambios y luego ejecuta.
  // const {id, emailUsuarioABorrar} = req.body
  /* const id = 4;
  const email = "dai@gmail.com"; */

  const {id, email} = req.query;

  if (email === "owner@mail.com") {
    return res.status(404).send(`You can't delete the owner!`)
  }

  try {
    const validUserToDelete = await Customer.findOne({ where: { email } });
    const userPrivileged = await Customer.findByPk(parseInt(id));
    if (
      (userPrivileged.dataValues.owner || userPrivileged.dataValues.admin) &&
      validUserToDelete
    ) {
      if (
        userPrivileged.dataValues.admin &&
        validUserToDelete.dataValues.admin
      ) {
        res
          .status(404)
          .send(`You must have owner privileges to delete another admin`);
      } else {
        await Customer.destroy({ where: { email } });
        res.status(201).send(mappedUsers([validUserToDelete]));
      }
    } else {
      !validEmail
        ? res.status(404).send(`User's email not found`)
        : res.status(404).send(`You must have owner privileges`);
    }
  } catch (error) {
    throw new Error(`Currently unavailable to delete user: ${error}`);
  }
});

module.exports = adminUsersRoutes;
