import React, { useState } from "react";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../state/user";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { resetProducts } from "../../state/products";
import toast, { Toaster } from "react-hot-toast";
import Badge from "@mui/material/Badge";
import HistoryIcon from '@mui/icons-material/History';
import { margin } from "@mui/system";
import { resetCategories } from "../../state/categories";
import { resetAllP } from "../../state/allProducts";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const StyledLink = styled(Link)({
    textDecoration: "none",
  });
  const handleClick = async () => {
    try {
      await axios.post(
        "http://localhost:3001/users/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("user");
      dispatch(setUser({}));
      dispatch(resetProducts([]));
      dispatch(resetCategories([]));
      dispatch(resetAllP([]));
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const theme = useTheme();

  const addQty = () => {
    const qtyItems = products.reduce(
      (acc, product) => acc + product.shopQuantity,
      0
    );
    return qtyItems;
  };

  const handleCartView = () => {
    products.length < 1 &&
      toast.error("No products added to cart yet", {
        duration: "80",
        style: {
          background: "white",
          color: "black",
          opacity: ".3",
        },
      });
  };

  return (
    <>
      <React.Fragment>
        <AppBar sx={{ background: "#063970" }}>
          <Toolbar>
            {user.id && (
              <StyledLink to={products.length >= 1 ? "/carrito" : ""}>
                <Badge badgeContent={addQty()} color="primary">
                  <ShoppingCartIcon
                    sx={{ transform: "scale(1.5)", color: "white" }}
                    onClick={() => handleCartView()}
                  />
                </Badge>
              </StyledLink>
            )}
            {/* Voy a necesitar que el back pueda darme un usuario como admin o owner */}
            {
              /* user.admin || user.owner */
              user.id && (
                <StyledLink to={"/categorias"}>
                  <Tab label="categorias(admin)" sx={{ color: "white" }} />
                </StyledLink>
              )
            }
            {
              /* user.admin || user.owner */
              user.id && (
                <StyledLink to={"/productos"}>
                  <Tab label="productos(admin)" sx={{ color: "white" }} />
                </StyledLink>
              )
            }
            <>
              <Tabs
                sx={{ marginLeft: "auto" }}
                indicatorColor="secondary"
                textColor="inherit"
                value={0}
              >
                <StyledLink to={"/"}>
                  <Tab label="home" sx={{ color: "white" }} />
                </StyledLink>
                <StyledLink to={"/shopping-history"} sx={{display:"flex", alignItems:"center"}}>
                  <HistoryIcon sx={{ color: "white", width:"0.85em"}}/>
                <Tab label="Historial" sx={{ color: "white", paddingLeft:0.5}}/>
                
                </StyledLink>
                <Tab label="marcas" />
                <Tab label="sale" />
              </Tabs>

              {user.id ? (
                <>
                  <div
                    style={{ padding: "0px 20px 0px 20px ", display: "flex" }}
                  >
                    <Button
                      onClick={() => handleClick()}
                      sx={{ marginRight: "2%" }}
                      variant="contained"
                    >
                      {user.full_name}
                    </Button>
                    <Button
                      onClick={() => handleClick()}
                      sx={{ marginLeft: "auto" }}
                      variant="contained"
                    >
                      logout
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <StyledLink to="/login">
                    <Button sx={{ marginLeft: "auto" }} variant="contained">
                      Login
                    </Button>
                  </StyledLink>
                  <StyledLink to="/register">
                    <Button sx={{ marginLeft: "10px" }} variant="contained">
                      registro
                    </Button>
                  </StyledLink>
                </>
              )}
            </>
          </Toolbar>
        </AppBar>
      </React.Fragment>
      <Toaster />
    </>
  );
};

export default Navbar;
