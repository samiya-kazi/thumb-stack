import { Routes, Route } from 'react-router-dom';
import Dashboard from "./Dashboard";
import Home from './Home';
import Login from "./Login";
import Register from "./Register";


function MainComponent () {
  return (
    <div className='main-container'>

    <Routes>
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/register"
        element={<Register />}
        />
      <Route
        path="/"
        element={<Home />}
        />
    </Routes>
    </div>
  )
}


export default MainComponent;