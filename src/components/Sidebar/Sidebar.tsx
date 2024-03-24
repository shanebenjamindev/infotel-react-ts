// Sidebar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { sidebar } from "../../data";
import "./sidebar.scss";

const Sidebar = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <button className="sidebar-toggle btn__Primary" onClick={toggleSidebar}>
        {isSidebarOpen ? "Close" : "Menu"}
      </button>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
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
    </>
  );
};

export default Sidebar;
