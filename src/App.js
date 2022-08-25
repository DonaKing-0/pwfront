import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Pagina from './components/Pagina';
import { useState } from 'react';

function App() {

  const [log, setLog] = useState(true);

  const setlog=(stato)=>{
    console.log(stato)
    setLog(stato);
}

  return (
    <div className="App">

      {/*log && <Login setlog={setlog}></Login>*/}
      {/*!log && */<Pagina></Pagina>}
      
    </div>
  );
}

export default App;
