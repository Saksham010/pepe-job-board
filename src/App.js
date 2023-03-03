import './App.css';
import {Routes,Route, } from "react-router-dom";
import Navbar from './components/navbar/navbar';
import Homepage from './components/homepage/homepage';
import Form from './components/Form/Form';
import ReactGA from 'react-ga';
const TRACKING_ID = "G-0CPPKXHV58"; // TRACKING_ID
ReactGA.initialize(TRACKING_ID);

function App() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    <div className="App">
      <Navbar/>

      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/form' element={<Form /> }/>
        <Route path='/internship' element={<Homepage/>} />

      </Routes>

    </div>
  );
}

export default App;
