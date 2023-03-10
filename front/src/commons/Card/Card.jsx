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
function CardItem() {
  const { id } = useParams();
  const [phone, setPhone] = useState({});
  console.log(id);
  useEffect(() => {
    axios.get(`http://localhost:3001/products/${id}`).then((data) => {
      setPhone(data);
    });
  }, [id]);
  console.log(phone);
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
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardActionArea sx={{ flex: 1 }}>
                <CardMedia
                  component="img"
                  image={phone.data.images[0]}
                  style={{ maxHeight: 400, objectFit: "contain" }}
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
                    {phone.data.info}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Color: {phone.data.color}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {phone.data.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Añadir al carrito
                </Button>
                <Button size="small" component={Link} to="/grilla">Volver atrás</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default CardItem;
