import { useEffect } from "react";
import ActualData from "../../ActualData/ActualData";
import ReservationForecast from "../ReservationForecast/ReservationForecast";
import "./dashboard.scss";
import * as d3 from "d3";

export default function Dashboard() {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/Reservations.csv");
      const csvData = await response.text();
      const parsedData = d3.csvParse(csvData);
      console.log(parsedData);
    };
    fetchData(); // Don't forget to call the fetchData function
  }, []);

  return (
    <section className="dashboard">
      <div className="box box1">
        <h3>This Month</h3>
        <h4>Forecast</h4>
        <p>4,308 Room Nights</p>
      </div>
      <div className="box box2">
        <h3>3 Month</h3>
        <h4>Forecast</h4>
        <p>6,805 Room Nights</p>
      </div>
      <div className="box box3">
        <h3>6 Month</h3>
        <h4>Forecast</h4>
        <p>9,058 Room Nights</p>
      </div>
      <div className="box box4">
        <ActualData />
      </div>
      <div className="box box5">
        <ReservationForecast />
      </div>
    </section>
  );
}
