import { Link } from "react-router-dom";

function Navbar () {
  return (
    <div className="nav">
      <Link to="/">
        <div className="logo">ThumbStack</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}


export default Navbar;