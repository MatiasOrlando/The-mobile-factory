import * as React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { cartProducts, removeProduct } from "../../state/products";
import { useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import toast from "react-hot-toast";

function GrillaDeProductos() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);

  async function add(producto) {
    if (producto.shopQuantity < producto.stock) {
      try {
        const productAdded = await axios.post(`http://localhost:3001/carrito`, {
          productId: Number(producto.id),
          customerId: Number(user.id),
          productQuantity: 1,
        });
        dispatch(cartProducts(productAdded.data));
      } catch (error) {
        console.error(error);
      }
    } else {
      toast.error("No hay más stock", {
        duration: "180",
        style: {
          background: "white",
          color: "black",
        },
      });
    }
  }

  async function decrease(producto) {
    if (producto.shopQuantity === 1) {
      toast.error("La cantidad debe ser igual o superior a 1", {
        duration: "180",
        style: {
          background: "white",
          color: "black",
        },
      });
    } else {
      try {
        const productAdded = await axios.put(`http://localhost:3001/carrito`, {
          productId: Number(producto.id),
          customerId: Number(user.id),
          productQuantity: Number(producto.shopQuantity) - 1,
        });
        dispatch(cartProducts(productAdded.data));
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function deleteP(producto) {
    try {
      const productDeleted = await axios.delete(
        `http://localhost:3001/carrito?productId=${producto.id}&customerId=${user.id}`
      );
      dispatch(removeProduct(productDeleted.data));
      products.length === 1 && navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  function totalSum() {
    const totalPriceItems = products
      .map((product) => parseInt(product.price) * product.shopQuantity)
      .reduce((acumulador, elemento) => acumulador + elemento, 0);
    return totalPriceItems;
  }

  function confirmBuy() {
    navigate("/shopConfirm");
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: "150px" }}>
      <Grid container spacing={3}>
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
                  <IconButton
                    aria-label="Agregar"
                    onClick={() => add(producto)}
                  >
                    <Add />
                  </IconButton>
                  <IconButton
                    aria-label="Disminuir"
                    onClick={() => decrease(producto)}
                  >
                    <Remove />
                  </IconButton>
                  <IconButton
                    aria-label="Delete"
                    onClick={() => deleteP(producto)}
                  >
                    <Delete />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "50px",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Total a pagar: €{totalSum()}
        </Typography>
        <Button
          variant="contained"
          type="submit"
          color="success"
          endIcon={<SendIcon />}
          sx={{ margin: "10px" }}
          onClick={() => confirmBuy()}
        >
          CONFIRMAR COMPRA
        </Button>
      </div>
    </Container>
  );
}

export default GrillaDeProductos;
