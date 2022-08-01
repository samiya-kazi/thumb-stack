import auth from '../utils/auth';
import { Link } from "react-router-dom";
import { logout } from "../Services/apiService";
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png'

function Navbar ({ isAuth, setIsAuth }) {

  let navigate = useNavigate();

  function handleLogout () {
    logout();
    handleAuth();
  }

  function handleAuth () {
    setIsAuth(false);
    auth.logout(() => navigate('/'));
  };


  return (
    <div className="nav">
        <Link to="/">
        <div className="logo">
          <img src={logo} className='logo-png' />
          <div className="logo-name">ThumbStack</div>
        </div>
        </Link>
      <nav>
        <ul>
          {isAuth ? 
          (<>
              <Link to="/dashboard">
                <li>Dashboard</li>
              </Link>
            
              <div className="logout" onClick={handleLogout}>
                <li className='nav-button'>Logout</li>
              </div>
          </>)
          :
          (<>
              <Link to="/login">
                <li>Login</li>
              </Link>
            
              <Link to="/register">
                <li>Register</li>
              </Link>
            
          </>
          )}
        </ul>
      </nav>
    </div>
  )
}


export default Navbar;