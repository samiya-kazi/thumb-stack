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
          (<li>
            <a onClick={handleLogout}>Logout</a>
          </li>)
          :
          (<>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
          )}
        </ul>
      </nav>
    </div>
  )
}


export default Navbar;