import './App.css';
import Grilla from '../Content/Grid';
import { Register } from '../Register/Register';
import { Login } from '../Login/Login';
import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login /> } />
        </Routes> 
     </BrowserRouter>
    </div>
  );
}

export default App;
