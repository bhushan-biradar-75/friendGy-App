import { BrowserRouter , Routes , Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Navbar from './Components/Navbar'
import Link from './Components/Link'

function App() {
  return (
    <div>

      <BrowserRouter>
      <Navbar/>
      <Routes>

     <Route path='/' element={<Home/>}/>
     <Route path='/Link' element={<Link/>}/>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
