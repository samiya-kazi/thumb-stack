import auth from '../utils/auth';
import { Link } from "react-router-dom";
import { logout } from "../Services/apiService";
import { useNavigate } from 'react-router-dom';

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
      <div className="logo">
        <Link to="/">
          <div className="logo">ThumbStack</div>
        </Link>
      </div>
      <nav>
        <ul>
          {isAuth ? 
          (<>
              <Link to="/dashboard">
                <li>Dashboard</li>
              </Link>
            
              <div onClick={handleLogout}>
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