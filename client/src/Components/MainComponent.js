import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUserInfo } from '../Services/apiService';
import Dashboard from "./Dashboard";
import Home from './Home';
import Login from "./Login";
import Register from "./Register";


function MainComponent ({ isAuth, setIsAuth }) {

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isAuth) {
      getUserInfo()
        .then(user => setUser(user))
        .catch(err => console.log(err));
    } else {
      setUser(null);
    }
  }, [isAuth]);

  return (
    <div className='main-container'>

    <Routes>
      <Route
        path="/dashboard"
        element={<Dashboard user={user} />}
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
        path="/"
        element={<Home user={user} />}
        />
    </Routes>
    </div>
  )
}


export default MainComponent;