import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import MainComponent from './Components/MainComponent';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <MainComponent />
      </Router>
    </div>
  );
}

export default App;
