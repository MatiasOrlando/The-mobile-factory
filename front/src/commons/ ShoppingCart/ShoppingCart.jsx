import * as React from "react";
import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { cartProducts, removeProduct } from "../../state/products";
import { useNavigate } from "react-router-dom";

function GrillaDeProductos() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [carrito, setCarrito] = useState([]);

  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);

  /*  useEffect(() => {
    setCarrito(products);
  }, [products]) */

  async function suma(producto) {
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
      alert("No hay más stock!");
    }
  }

  async function resta(producto) {
    if (producto.shopQuantity === 1) {
      alert("La cantidad debe ser igual o superior a 1!");
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

  async function eliminar(producto) {
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
                    onClick={() => suma(producto)}
                  >
                    <Add />
                  </IconButton>
                  <IconButton
                    aria-label="Disminuir"
                    onClick={() => resta(producto)}
                  >
                    <Remove />
                  </IconButton>
                  <IconButton
                    aria-label="Delete"
                    onClick={() => eliminar(producto)}
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
          marginTop: "70px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Total a pagar: €{totalSum()}
        </Typography>
      </div>
    </Container>
  );
}

export default GrillaDeProductos;
