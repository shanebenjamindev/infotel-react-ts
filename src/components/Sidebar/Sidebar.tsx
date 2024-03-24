import { Link, useLocation } from "react-router-dom";
import { sidebar } from "../../data";
import "./sidebar.scss";

export default function Sidebar() {
  const location = useLocation();

  return (
    <section className="sidebar">
      {sidebar.map((item) => (
        <div className={`item`} key={item.id} style={{ height: "100%" }}>
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
    </section>
  );
}
