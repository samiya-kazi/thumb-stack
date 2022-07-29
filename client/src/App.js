import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainComponent from './Components/MainComponent';
import Navbar from './Components/Navbar';
import auth from './utils/auth';

function App() {

  const initialState = auth.isAuthenticated();
  const [isAuth, setIsAuth] = useState(initialState);

  return (
    <div className="App">
      <Router>
        <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
        <MainComponent isAuth={isAuth} setIsAuth={setIsAuth} />
      </Router>
    </div>
  );
}

export default App;
