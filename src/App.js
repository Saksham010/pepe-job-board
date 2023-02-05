import './App.css';
import {Routes,Route, } from "react-router-dom";
import Navbar from './components/navbar/navbar';
import Homepage from './components/homepage/homepage';
import Form from './components/Form/Form';
function App() {
  return (
    <div className="App">
      <Navbar/>

      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/form' element={<Form /> }/>

      </Routes>

    </div>
  );
}

export default App;
