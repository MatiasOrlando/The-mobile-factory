const express = require("express");
const { Carrito, Customer, Order } = require("../models");
const checkoutRouter = express.Router();
const sendEmail = require("../config/orderMail");


checkoutRouter.post("/addOrder", async (req, res) => {
    try {
        let id = req.body.id
        const carritoProds = await Carrito.findAll({
            where: {
                customerId: id
            }
        })
        const userInfo = await Customer.findOne({
            where: {
                id: id
            }
        })

        if (!userInfo) return res.status(404).send("Cart invalid")
        if (!carritoProds.length) return res.status(404).send("User invalid")

        let { billing_address, email, id: userId } = userInfo.dataValues;

        const newCarrito = carritoProds.map(prod => prod.dataValues)
        const total = newCarrito.reduce((acc, ite) => acc + parseFloat(ite.price) * ite.quantity, 0)

        const order = await Order.create({
            products: newCarrito,
            price: total,
            shipping_address: billing_address,
            order_email: email,
            customerId: userId
        })

        Carrito.destroy({
            where: {
                customerId: id
            }
        })

        if (order) {
            sendEmail(total, billing_address, email)
        }
        res.send(order)
    } catch (error) {
        console.log(`Error`, error);
    }
})

checkoutRouter.get("/ordersUser/:customerId", async (req, res) => {
    //:customerId , es el usuario al cual que se quiere ver su historial de orders
    //req.body.id , es el id para verificar si el que pide ese historial es admin/owner
    try {
        const theId = req.body.id;
        const adminOrOwner = await Customer.findOne({
            where: {
                id: theId
            }
        });

        if (!adminOrOwner.admin && !adminOrOwner.owner) return res.status(404).send("You must be admin or owner")

        const id = req.params.customerId;

        const userCheck = await Customer.findOne({
            where: {
                id: id
            }
        });

        if (!userCheck) return res.status(404).send("user does not exist")

        if (userCheck.admin || userCheck.owner) return res.status(404).send("info of another admin/owner not available")

        const orders = await Order.findAll({
            where: {
                customerId: id
            }
        })

        if (!orders.length) return res.status(404).send("Invalid id user")

        res.send(orders)

    } catch (error) {
        console.log(error);
    }
})

checkoutRouter.get("/ordersOneUser/:customerId", async (req, res) => {
    //:customerId , es el usuario al cual que se quiere ver su historial de orders
    //req.body.id , es el id para verificar si el que pide ese historial es admin/owner
    let theId = req.params.customerId;

    let user = await Customer.findByPk(theId)

    if (!user) return res.status(404).send("Invalid id user")

    try {
        const orders = await Order.findAll({
            where: {
                customerId: user.id
            }
        })

        res.send(orders)

    } catch (error) {
        console.log(error);
    }
})



module.exports = checkoutRouter;