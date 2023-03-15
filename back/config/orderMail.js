const nodemailer = require("nodemailer")

const sendEmail = async (total, address, email) => {
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
            to: `${email}`,
            subject: "hola",
            html: `<h1>GRACIAS POR SU COMPRA</h1>
                    <p>TOTAL ABONADO: ${total}</p>
                    <p>DESTINO : ${address}</p>`,
        })
        console.log("email sent successfully");
    } catch (error) {
        console.log(error);
    }
}

module.exports = sendEmail;
