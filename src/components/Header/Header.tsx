import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <Link to="/" className="navbar-brand">
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
        <ul className="navbar-nav">
          <li className="nav-item">
            <button className="nav-link">PC/Mobile</button>
          </li>
        </ul>
      </div>
      <div className="d-flex align-items-center">
        User's name
        <BellOutlined />
        <UserOutlined />
      </div>
    </nav>
  );
}
