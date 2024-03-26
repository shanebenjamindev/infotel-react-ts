import { Link, useNavigate } from "react-router-dom";
import { getUser, logoutUser } from "../../hooks/userHook";
import "./header.scss";
export default function Header() {
  const user = getUser();
  const navigate = useNavigate();
  const handleLogout = () => {
    logoutUser(navigate);
  };
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light">
      <Link to="/" className="navbar-brand section__Title">
        Infotel
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div
        className="collapse navbar-collapse d-lg-flex justify-content-center"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav text-center">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
        </ul>
        <div
          className="d-flex ml-auto justify-content-center align-items-center"
          style={{ gap: "10px" }}
        >
          {user ? (
            <div className="d-flex align-items-center" style={{ gap: "20px" }}>
              <span>Welcome, {user.fullName}</span>
              <button onClick={handleLogout} className="btn__Danger">
                Logout
              </button>
              {user && user.role === "admin" ? (
                <Link to="/admin">
                  <button className="btn__Primary">Go to Admin</button>
                </Link>
              ) : null}
            </div>
          ) : (
            <Link to="/login">
              <button className="btn__Primary">Login</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
