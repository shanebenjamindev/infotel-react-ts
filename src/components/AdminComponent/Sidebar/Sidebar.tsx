// Sidebar.jsx
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { sidebar } from "../../../data";
import "./sidebar.scss";
import { logoutUser } from "../../../hooks/userHook";

const Sidebar = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    logoutUser(navigate);
  };
  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      <button className="sidebar-toggle btn__Primary" onClick={toggleSidebar}>
        {isSidebarOpen ? "Close" : "Menu"}
      </button>
      <div className="">
        <img src="/images/logo.png" width={"100%"} />
      </div>

      <div>
        {sidebar.map((item) => (
          <div className={`item  `} key={item.id}>
            <span className="title">{item.title}</span>
            {item.listItems.map((listItem) => (
              <Link
                to={`${listItem.url}`}
                key={listItem.id}
                className={`listItem ${
                  location.pathname === listItem.url ? "active" : ""
                }`}
              >
                <img src={`${listItem.icon}`} alt={listItem.title} />
                <span>{listItem.title}</span>
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="text-center m-2">
        <button className="w-100 btn__Danger outline" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
