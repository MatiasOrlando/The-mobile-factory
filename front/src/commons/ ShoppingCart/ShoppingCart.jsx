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

function GrillaDeProductos() {
  const [total, setTotal] = useState(0);
  const [carrito, setCarrito] = useState([]);
  const productos = useSelector((state) => state.products);
  console.log("productos en cart", productos);
  function suma(id) {
    const producto = products.find((producto) => producto.id === id);
    const precioNumerico = parseFloat(producto.price.replace(/[^\d.-]/g, ""));
    setCarrito([...carrito, producto]);
    setTotal(total + precioNumerico);
  }

  function resta(id) {
    const producto = carrito.find((producto) => producto.id === id);
    const nuevosProductos = [...carrito];
    const index = nuevosProductos.indexOf(producto);
    if (producto.cantidad === 1) {
      nuevosProductos.splice(index, 1);
    } else {
      nuevosProductos[index].cantidad -= 1;
    }
    setCarrito(nuevosProductos);
    setTotal(total - parseFloat(producto.price));
  }

  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        {productos.length &&
          productos.map((producto, index) => (
            <Grid item xs={12} sm={6} md={4} key={producto.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  image={producto.images[0]}
                  alt={producto.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {producto.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Precio: ${producto.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Cantidad: {producto.stock}
                  </Typography>
                  <IconButton
                    aria-label="Agregar"
                    onClick={() => suma(producto.id)}
                  >
                    <Add />
                  </IconButton>
                  <IconButton
                    aria-label="Disminuir"
                    onClick={() => resta(producto.id)}
                  >
                    <Remove />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
      <Typography variant="h6" gutterBottom>
        Total a pagar: ${total}
      </Typography>
    </Container>
  );
}

export default GrillaDeProductos;
