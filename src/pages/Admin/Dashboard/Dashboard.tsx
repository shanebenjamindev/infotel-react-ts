import { getUser } from "../../../hooks/userHook";
import ActualData from "../../ActualData/ActualData";
import ReservationForecast from "../ReservationForecast/ReservationForecast";
import "./dashboard.scss";

export default function Dashboard() {
  const user = getUser();
  return (
    <div className="dashboard">
      <div className="box box4">
        {user ? (
          <h1 className="dashboard__Top ">
            WELLCOME, <strong> {user.fullName}</strong>
          </h1>
        ) : null}
        <ActualData />
      </div>
      <div className="box box5">
        <ReservationForecast />
      </div>
    </div>
  );
}

// <div className="box box1">
//         <h3>This Month</h3>
//         <h4>Forecast</h4>
//         <p>4,308 Room Nights</p>
//       </div>
//       <div className="box box2">
//         <h3>3 Month</h3>
//         <h4>Forecast</h4>
//         <p>6,805 Room Nights</p>
//       </div>
//       <div className="box box3">
//         <h3>6 Month</h3>
//         <h4>Forecast</h4>
//         <p>9,058 Room Nights</p>
//       </div>
