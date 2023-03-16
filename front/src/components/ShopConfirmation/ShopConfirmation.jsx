import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Cleave from "cleave.js/react";
import "./ShopConfirmation.css";

const ShopConfirmation = () => {
  const navigate = useNavigate();
  /* const confDate = new Date(); */
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);
  function totalSum() {
    const totalPriceItems = products
      .map((product) => parseInt(product.price) * product.shopQuantity)
      .reduce((acumulador, elemento) => acumulador + elemento, 0);
    return totalPriceItems;
  }

  const [orderData, setOrderData] = useState({
    price: totalSum(),
    products: [...products],
    shipping_address: user.default_shipping_address,
    order_email: user.email,
    //PUEDO MANDAR UN DATE DIRECTAMENTE O STRING
    /* order_date: confDate.toUTCString(), */
  });

  const handleConfirmState = (e) => {
    setOrderData({ ...orderData, [e.target.id]: e.target.value });
  };

  const [cardType, setCardType] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [payMethod, setPayMethod] = useState("tarjeta");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (payMethod === "tarjeta") {
      if (!cardType) {
        return toast.error("Escribe un número válido de tarjeta", {
          duration: "180",
          style: {
            background: "white",
            color: "black",
          },
        });
      }
      if (cardType !== "amex" && cardNum.length !== 16) {
        return toast.error("Escribe un número válido de tarjeta", {
          duration: "180",
          style: {
            background: "white",
            color: "black",
          },
        });
      }
      if (cardType === "amex" && cardNum.length !== 15) {
        return toast.error("Escribe un número válido de tarjeta", {
          duration: "180",
          style: {
            background: "white",
            color: "black",
          },
        });
      }
    }
    /* PEGAMOS A DB */
    toast.success("Compra realizada con éxito!", {
      duration: "180",
      style: {
        background: "white",
        color: "black",
      },
    });
  };

  function onCreditCardChange(event) {
    /* // formatted pretty value
    console.log(event.target.value);
    // raw value
    console.log(event.target.rawValue); */

    const value = event.target.value;
    if (/^4/.test(value)) {
      setCardType("visa");
      setCardNum(event.target.rawValue);
    } else if (/^5[1-5]/.test(value)) {
      setCardType("mastercard");
      setCardNum(event.target.rawValue);
    } else if (/^3[47]/.test(value)) {
      setCardType("amex");
      setCardNum(event.target.rawValue);
    } else {
      setCardType("");
    }
  }

  const selectInput = (e) => {
    setPayMethod(e.target.value);
    if (e.target.value === "efectivo") setCardType("");
  };

  return (
    <div style={{ marginTop: "100px", height: 400, width: "100%" }}>
      <Typography variant="h3" align="center">
        CONFIRMACIÓN DE COMPRA
      </Typography>
      <Typography variant="h4" align="center">
        TOTAL A PAGAR: € {totalSum()}
      </Typography>
      <div style={{ textAlign: "center" }}>
        <Box
          component="form"
          autoComplete="off"
          margin={2}
          onSubmit={(e) => handleSubmit(e)}
        >
          <TextField
            sx={{ margin: "10px", width: "20%" }}
            required
            id="shipping_address"
            label="Dirección de envío"
            variant="outlined"
            onChange={(e) => handleConfirmState(e)}
            size="small"
            value={orderData.shipping_address}
          />
          <TextField
            sx={{ margin: "10px", width: "20%" }}
            required
            id="order_email"
            label="Email"
            variant="outlined"
            onChange={(e) => handleConfirmState(e)}
            size="small"
            value={orderData.order_email}
          />
          <Button
            variant="contained"
            type="submit"
            color="success"
            endIcon={<SendIcon />}
            sx={{ margin: "9px" }}
          >
            COMPRAR
          </Button>
        </Box>
        <div>
          <FormControl sx={{ width: "35%" }}>
            <InputLabel id="demo-simple-select-label">Forma de pago</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={payMethod}
              onChange={(e) => selectInput(e)}
              size="small"
            >
              <MenuItem value={"efectivo"}>Pago al recibir</MenuItem>
              <MenuItem value={"tarjeta"}>Tarjeta de Crédito</MenuItem>
            </Select>
          </FormControl>
        </div>
        {payMethod === "tarjeta" && (
          <div
            style={{
              margin: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Cleave
              placeholder="Número de tarjeta de crédito"
              options={{ creditCard: true }}
              onChange={onCreditCardChange}
              style={{
                padding: "10px",
                border: "2px solid #ccc",
                borderRadius: "5px",
                fontSize: "16px",
                width: "30%",
                boxSizing: "border-box",
              }}
              id="probando8"
            />

            <img
              className={cardType === "visa" ? "cards" : "cardsOff"}
              src="https://1000logos.net/wp-content/uploads/2017/06/VISA-Logo-1976.png"
              alt="Visa"
            />

            <img
              className={cardType === "mastercard" ? "cards" : "cardsOff"}
              src="https://www.pngfind.com/pngs/m/333-3331248_deja-un-comentario-cancelar-respuesta-mastercard-logo-hd.png"
              alt="Mastercard"
            />

            <img
              className={cardType === "amex" ? "cards" : "cardsOff"}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png"
              alt="American Express"
            />
          </div>
        )}
      </div>
      <Grid
        container
        spacing={3}
        sx={{ display: "flex", justifyContent: "center", margin: "20px" }}
      >
        {products.length &&
          products.map((producto, index) => (
            <Grid item xs={12} sm={6} md={4} key={producto.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: 260,

                  justifyContent: "space-between",
                }}
              >
                <CardMedia
                  component="img"
                  image={producto.images[0]}
                  alt={producto.name}
                  style={{
                    maxHeight: 280,
                    objectFit: "contain",
                    padding: "20px 0px 20px 0px",
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }} align="center">
                  <Typography gutterBottom variant="h5" component="h2">
                    {producto.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Precio: ${producto.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Cantidad: {producto.shopQuantity}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Stock: {producto.stock}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default ShopConfirmation;
