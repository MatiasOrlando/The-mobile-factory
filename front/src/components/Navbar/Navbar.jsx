import React, { useState } from "react";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme
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
import { TextField } from "@mui/material";
import { margin } from "@mui/system";
import { resetCategories } from "../../state/categories";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { queryProducts } from "../../state/querySearch";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const StyledLink = styled(Link)({
    textDecoration: "none",
  });

const handleSubmit = async(e)=>{
  e.preventDefault()
  const productSearch= await axios.get(`http://localhost:3001/search?searchTerm=${searchValue}`)
  dispatch(queryProducts(productSearch))
  navigate("/search")
}

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
                <StyledLink to={"/categorias"} >
                  <Tab label="categorias(admin)" sx={{ color: "white" }} />
                </StyledLink>
              )
            }
            <form onSubmit={handleSubmit}>
              <TextField
    label="Buscar"
    color="primary"
    variant="outlined"
    size="small"
    value={searchValue}
    onChange={handleSearchValueChange}
    sx={{ marginLeft: "30px", backgroundColor:"white", borderRadius:"8px",width:"110%"}}
        />
            </form>
            
            <>
              <Tabs
                sx={{ marginLeft: "auto" }}
                indicatorColor="primary"
                textColor="inherit"
                value={activeTab}
              >
                <StyledLink to={"/"}>
                  <Tab label="home" sx={{ color: "white" }} onClick={() => setActiveTab(0)} />
                </StyledLink>
                <StyledLink to={"/shopping-history"} sx={{display:"flex", alignItems:"center", marginLeft:"2%"}} onClick={() => setActiveTab(1)}>
                  <HistoryIcon sx={{ color: "white", width:"0.85em"}} />
                <Tab label="Historial" sx={{ color: "white", paddingLeft:0.5}}/>
                </StyledLink>
                <StyledLink to={"/admin"} sx={{display:"flex", alignItems:"center", marginLeft:"2px"}} onClick={() => setActiveTab(2)}>
                <SupervisorAccountIcon sx={{ color: "white", width:"0.85em"}}/>
                <Tab label="Admin" sx={{ color: "white", paddingLeft:"0.1px", paddingRight:"25%"}}/>
                </StyledLink >
                <Tab label="marcas" onClick={() => setActiveTab(3)}/>
                <Tab label="sale" onClick={() => setActiveTab(4)} />
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
