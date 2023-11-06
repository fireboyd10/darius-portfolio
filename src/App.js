import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Home} from './pages/Home';
import {Contact} from './pages/Contact';
import Header from './Components/Header';
import Footer from './Components/Footer';

function App() {
  return (
    <Router>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    <Footer/>
  </Router>
  );
}

export default App;
