import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import Header from './Components/Header';
import Footer from './Components/Footer';

function App() {
  return (
    <Router basename="/darius-portfolio">
      <Header />
      <Routes>
        <Route index element={<Home />} />         
        <Route path="/" element={<Home />} />      
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<Home />} />       
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

