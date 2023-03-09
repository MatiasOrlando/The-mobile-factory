import './App.css';
import { fetchDataApi } from '../../hooks/api';
import Grilla from '../Content/Grid';
import CardItem from '../../commons/Card/Card';

function App() {

  fetchDataApi();

  return (
    <div>
     <Grilla/>
    </div>
  );
}

export default App;
