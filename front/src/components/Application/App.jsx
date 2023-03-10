import './App.css';
import Grilla from '../Content/Grid';
import { Register } from '../Register/Register';
import { Login } from '../Login/Login';
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom"
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../state/user';
import CardItem from '../../commons/Card/Card';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userPersist = JSON.parse(localStorage.getItem("user")) || {}
    dispatch(setUser(userPersist));
  }, [])

  const handleClick = async () => {
    try {
      localStorage.removeItem("user");
      dispatch(setUser({}));
      await axios.post("http://127.0.0.1:3001/users/logout", {}, {withCredentials: true})
      navigate("/login")
    } catch (error) {
      console.error(error)
    }
    
  }

  return (
    <div>
      
        <Routes>
          <Route path='/login' element={<Login /> } />
          <Route path='/register' element={<Register /> } />
          <Route path='/grilla' element={<Grilla /> } />
          <Route path='/detail/:id' element={<CardItem/> } />
          <Route path='/' element={ 
            <button onClick={() => handleClick()}>LOGOUT</button>
           } />
        </Routes> 
    
    </div>
  );
}

export default App;
