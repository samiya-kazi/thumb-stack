import { Routes, Route } from 'react-router-dom';
import Dashboard from "./Dashboard";
import Home from './Home';
import Login from "./Login";
import Register from "./Register";


function MainComponent ({ isAuth, setIsAuth }) {

  return (
    <div className='main-container'>

    <Routes>
      <Route
        path="/dashboard"
        element={<Dashboard isAuth={isAuth} />}
      />
      <Route
        path="/login"
        element={<Login setIsAuth={setIsAuth} />}
      />
      <Route
        path="/register"
        element={<Register setIsAuth={setIsAuth} />}
        />
      <Route
        exact path="/"
        element={<Home isAuth={isAuth} />}
        />
    </Routes>
    </div>
  )
}


export default MainComponent;