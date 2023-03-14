const express = require("express");
const { Product, Carrito, Customer, Order } = require("../models");
const checkoutRouter = express.Router();
let nodemailer = require("nodemailer")

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
        res.send(order)
    } catch (error) {
        console.log(`Error`, error);
    }
})

checkoutRouter.get("/ordersUser/:customerId", async (req, res) => {
    try {
        const id = req.params.customerId
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

checkoutRouter.post("/sendEmail", async (req, res) => {
    console.log("post email");

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: "german.1990.cuevas@gmail.com",
                pass: "dogrxpheupvimthi"
            }
        })
        await transporter.sendMail({
            from: "german.1990.cuevas@gmail.com",
            to: "german.1990.cuevas@gmail.com",
            subject: "hola",
            text: "hola mundo",
        })
        res.status(200).send("email sent successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("something is wrong with the mail delivery")
    }






})

module.exports = checkoutRouter;