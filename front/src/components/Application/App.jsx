import './App.css';
import { fetchDataApi } from '../../hooks/api';

function App() {

  fetchDataApi();

  return (
    <div>
      <h1>HOLA MUNDO :D</h1>
    </div>
  );
}

export default App;
