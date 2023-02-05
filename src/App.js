import './App.css';
import {Routes,Route} from "react-router-dom";
import Navbar from './components/navbar/navbar';
import Homepage from './components/homepage/homepage';
function App() {
  return (
    <div className="App">
      <Navbar/>

      <Routes>
        <Route path='/' element={<Homepage/>} />

      </Routes>

    </div>
  );
}

export default App;
