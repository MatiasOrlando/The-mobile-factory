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

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const StyledLink = styled(Link)({
    textDecoration: "none",
  });
  const handleClick = async () => {
    try {
      localStorage.removeItem("user");
      dispatch(setUser({}));
      await axios.post(
        "http://127.0.0.1:3001/users/logout",
        {},
        { withCredentials: true }
      );
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const theme = useTheme();
  console.log(theme);

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#063970" }}>
        <Toolbar>
          {user.id ? (
            <Link to={"/carrito"}>
              <ShoppingCartIcon sx={{ transform: "scale(1.5)" }} />{" "}
            </Link>
          ) : (
            <StyledLink to={"/login"}>
              <ShoppingCartIcon sx={{ transform: "scale(1.5)" }} />{" "}
            </StyledLink>
          )}
          <>
            <Tabs
              sx={{ marginLeft: "auto" }}
              indicatorColor="secondary"
              textColor="inherit"
              value={0}
              onChange={(e, value) => setValue(value)}
            >
              <StyledLink to={"/"}>
                <Tab href="/" label="home" />
              </StyledLink>

              <Tab label="categories" />
              <Tab label="sale" />
            </Tabs>

            {user.id ? (
              <>
                <div style={{ padding: "0px 20px 0px 20px ", display: "flex" }}>
                  <Button
                    onClick={() => handleClick()}
                    sx={{ marginLeft: "auto" }}
                    variant="contained"
                  >
                    Logout
                  </Button>
                  <Typography sx={{ marginLeft: "5px", marginTop: "5px" }}>
                    {user.full_name}
                  </Typography>
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
                    SignUp
                  </Button>
                </StyledLink>
              </>
            )}
          </>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
