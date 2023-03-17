import * as React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Card } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartProducts } from "../../state/products";
import axios from "axios";
import { Button, CircularProgress } from "@mui/material";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
const StyledLink = styled(Link)({
  textDecoration: "none",
});

function ListSearch() {
  //const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);
  const queryData = useSelector((state) => state.queryData);

  const handleCarrito = async (device) => {
    try {
      const productAdded = await axios.post(`http://localhost:3001/carrito`, {
        productId: Number(device.id),
        customerId: Number(user.id),
        productQuantity: 1,
      });
      dispatch(cartProducts(productAdded.data));
    } catch (error) {
      console.error(error);
    }
  };
  console.log(queryData);

  return (
    
     <Paper
      sx={{
        p: 2,
        margin: "auto",
        //maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      
      <Grid container spacing={6} sx={{ marginTop: "5%" }}>
        {queryData.map((device) => (
          <Grid item xs={6} sm={3} md={3} lg={3} xl={3} key={device.id}>
            <Card
              sx={{
                margin: "0 0 18px 0",
                minWidth: 310,
                minHeight: 400,
                height: 200,
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Grid
                container
                sx={{
                  padding: "10px",

                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Grid item>
                  <StyledLink to={`/detail/${device.id}`}>
                    <ButtonBase sx={{ width: "100%", height: 125 }}>
                      <Img alt={device.name} src={device.images[0]} />
                    </ButtonBase>
                  </StyledLink>
                </Grid>
                <Grid
                  item
                  sx={{ textAlign: "center" }}
                  xs={12}
                  sm={2}
                  md={2}
                  lg={12}
                  xl={2}
                >
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                      >
                        {device.name}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {device.info}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        Stock : {device.stock}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Color: {device.color}
                      </Typography>
                      <Grid item>
                        <StyledLink to={`/detail/${device.id}`}>
                          <Typography>ver detalles</Typography>{" "}
                        </StyledLink>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Button
                        disabled={device.stock ? false : true}
                        onClick={() => {
                          handleCarrito(device);
                        }}
                        sx={{ cursor: "pointer" }}
                        variant="body2"
                      >
                        Añadir al carrito
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="text.secondary">
                    {device.price}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
export default ListSearch;