import "./App.css";
import Grilla from "../Content/Grid";
import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import Navbar from "../Navbar/Navbar";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../state/user";
import CardItem from "../../commons/Card/Card";
import ShoppingCart from "../../commons/ ShoppingCart/ShoppingCart";
import { cartProducts } from "../../state/products";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userPersist = JSON.parse(localStorage.getItem("user")) || {};
    const cartPersist = JSON.parse(localStorage.getItem("cart")) || [];
    dispatch(setUser(userPersist));
    if (cartPersist.length) {
      cartPersist.forEach((item) => {
        dispatch(cartProducts(item));
      });
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/carrito" element={<ShoppingCart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/grilla" element={<Grilla />} />
        <Route path="/detail/:id" element={<CardItem />} />
        <Route path="/" element={<Grilla />} />
        {/* <Route
          path="/"
          element={<button onClick={() => handleClick()}>LOGOUT</button>}
        /> */}
      </Routes>
    </div>
  );
}

export default App;
