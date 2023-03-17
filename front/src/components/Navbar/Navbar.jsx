import React, { useState } from "react";
import {
  AppBar,
  Button,
  Switch,
  Tab,
  Tabs,
  Toolbar,
  Typography,
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
import HistoryIcon from "@mui/icons-material/History";
import { TextField } from "@mui/material";
import { resetCategories } from "../../state/categories";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { queryProducts, queryReset } from "../../state/querySearch";
import { resetAllP } from "../../state/allProducts";
import { resetAllCust } from "../../state/allCustomers";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [checked, setChecked] = useState(false);

  const StyledLink = styled(Link)({
    textDecoration: "none",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checked) {
      try {
        const productSearch = await axios.get(
          `http://localhost:3001/search/category/${searchValue}`
        );
        dispatch(queryProducts(productSearch.data));
        navigate("/search");
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const productSearch = await axios.get(
          `http://localhost:3001/search?searchTerm=${searchValue}`
        );
        dispatch(queryProducts(productSearch.data));
        navigate("/search");
      } catch (error) {
        console.error(error);
      }
    }
  };

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
      dispatch(resetAllCust([]));
      dispatch(queryReset([]));
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const addQty = () => {
    const qtyItems = products.reduce(
      (acc, product) => acc + product.shopQuantity,
      0
    );
    return qtyItems;
  };

  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value);
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

  const handleSwitch = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <>
      <React.Fragment>
        <AppBar sx={{ background: "#000" }}>
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
            <form onSubmit={handleSubmit}>
              <TextField
                label={checked ? "Buscar por categoria" : "Buscar por nombre"}
                color="primary"
                variant="outlined"
                size="small"
                value={searchValue}
                onChange={handleSearchValueChange}
                sx={{
                  marginLeft: "30px",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  width: "110%",
                }}
              />
            </form>
            <Typography sx={{ marginLeft: "55px" }} component="label">
              <Switch
                checked={checked}
                onChange={(event) => handleSwitch(event)}
                color="secondary"
              />
            </Typography>
            <>
              <Tabs
                sx={{ marginLeft: "auto" }}
                indicatorColor="primary"
                textColor="inherit"
                value={activeTab}
              >
                <StyledLink to={"/"}>
                  <Tab
                    label="home"
                    sx={{ color: "white" }}
                    onClick={() => setActiveTab(0)}
                  />
                </StyledLink>
                {user.id ? (
                  <StyledLink
                    to={"/shopping-history"}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "2%",
                    }}
                    onClick={() => setActiveTab(1)}
                  >
                    <HistoryIcon sx={{ color: "white", width: "0.85em" }} />
                    <Tab
                      label="Historial"
                      sx={{ color: "white", paddingLeft: 0.5 }}
                    />
                  </StyledLink>
                ) : (
                  false
                )}

                {user.owner || user.admin ? (
                  <StyledLink
                    to={"/admin"}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "85px",
                    }}
                    onClick={() => setActiveTab(2)}
                  >
                    <SupervisorAccountIcon
                      sx={{
                        color: "white",
                        width: "0.85em",
                        padding: "0px",
                        margin: "0px",
                      }}
                    />
                    <Tab
                      label="Admin"
                      sx={{
                        color: "white",
                        paddingLeft: "0.1px",
                        paddingRight: "25%",
                      }}
                    />
                  </StyledLink>
                ) : (
                  false
                )}

                {user.admin || user.owner ? (
                  <StyledLink
                    to={"/categorias"}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <SupervisorAccountIcon
                      sx={{ color: "white", width: "0.85em" }}
                    />
                    <Tab
                      label="categorias"
                      sx={{ color: "white", padding: "0px" }}
                      onClick={() => setActiveTab(3)}
                    />
                  </StyledLink>
                ) : (
                  false
                )}

                {user.admin || user.owner ? (
                  <StyledLink
                    to={"/productos"}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <SupervisorAccountIcon
                      sx={{ color: "white", width: "0.85em" }}
                    />
                    <Tab
                      label="productos"
                      sx={{ color: "white", padding: "0px" }}
                      onClick={() => setActiveTab(4)}
                    />
                  </StyledLink>
                ) : (
                  false
                )}
              </Tabs>

              {user.id ? (
                <>
                  <div
                    style={{ padding: "0px 20px 0px 20px ", display: "flex" }}
                  >
                    <Typography
                      sx={{ marginRight: "2%", textAlign: "center" }}
                      variant="caption"
                    >
                      {user.full_name}
                    </Typography>
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
