import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import MainComponent from './Components/MainComponent';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Hero from './Components/Hero';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <MainComponent/>
      <Footer/>
    </div>
  );
}

export default App;
