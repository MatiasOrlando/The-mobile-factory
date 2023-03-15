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
import { cartProducts, loginProducts } from "../../state/products";
import ShoppingHistory from "../ShoppingHistory/ShoppingHistory";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(async () => {
    const userPersist = JSON.parse(localStorage.getItem("user")) || {};
    dispatch(setUser(userPersist));
    try {
      if (userPersist.id) {
        const userCart = await axios.get(`http://localhost:3001/carrito/${userPersist.id}`)
        if (typeof userCart.data !== "string") {
          dispatch(loginProducts(userCart.data));
        } else {
          dispatch(loginProducts([]))
        }
        
      }
    } catch (error) {
      console.error(error)
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
        <Route path="/shopping-history" element={<ShoppingHistory />} />
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
