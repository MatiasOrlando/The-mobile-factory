import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartProducts } from "../../state/products";

function CardItem() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [phone, setPhone] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:3001/products/${id}`).then((data) => {
      setPhone(data);
    });
  }, [id]);
  if (phone.data === undefined) {
    ("not dta");
  } else {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "60%",
          margin: "0 auto",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardActionArea sx={{ flex: 1 }}>
                <CardMedia
                  component="img"
                  image={phone.data.images[0]}
                  style={{
                    maxHeight: 400,
                    objectFit: "contain",
                    padding: "20px 0px 20px 0px",
                  }}
                />
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "fit-content", maxWidth: 350 }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {phone.data.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Color: {phone.data.color}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Display: {phone.data.display_size}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Almacenamiento: {phone.data.storage}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Nucleos: {phone.data.amountCores}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Año: {phone.data.year}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Precio: {phone.data.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Stock: {phone.data.stock}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions
                sx={{ display: "flex", justifyContent: "space-evenly" }}
              >
                <Button
                  size="small"
                  color="primary"
                  onClick={() => {
                    console.log(phone);
                    dispatch(cartProducts(phone.data));
                  }}
                >
                  Añadir al carrito
                </Button>
                <Button size="small" component={Link} to="/">
                  Volver atrás
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default CardItem;

// <Button
//                   size="small"
//                   color="primary"
//                   onClick={() => {
//                     dispatch(cartProducts(device));
//                   }}
//                 >
//                   Añadir al carrito
//                 </Button>
