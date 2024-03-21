import { Link } from "react-router-dom";
import { sidebar } from "../../data";
import "./sidebar.scss";

export default function Sidebar() {
  return (
    <div
      className="sidebar"
      style={{
        height: "100%",
      }}
    >
      {sidebar.map((item) => (
        <div className="item" key={item.id}>
          <span className="title"> {item.title}</span>
          {item.listItems.map((listItem) => (
            <Link to={`${listItem.url}`} key={listItem.id} className="listItem">
              <img src={`${listItem.icon}`} />
              <span>{listItem.title}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
