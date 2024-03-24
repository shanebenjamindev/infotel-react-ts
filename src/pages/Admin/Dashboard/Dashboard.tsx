import ActualData from "../../ActualData/ActualData";
import ReservationForecast from "../ReservationForecast/ReservationForecast";
import "./dashboard.scss";
export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="box box1"></div>
      <div className="box box2">Box 2</div>
      <div className="box box3">Box 3</div>
      <div className="box box4">
        <ActualData />
      </div>
      <div className="box box5">
        <ReservationForecast />
      </div>
    </div>
  );
}
