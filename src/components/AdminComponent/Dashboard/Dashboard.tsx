import { useEffect, useState } from "react";
import { getUser } from "../../../hooks/userHook";
import ActualData from "../ActualData/ActualData";
import ReservationForecast from "../ReservationForecast/ReservationForecast";
import "./dashboard.scss";

export default function Dashboard() {
  const user = getUser();
  const [greeting, setGreeting] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Function to get the current time and set the greeting message accordingly
    function setGreetingMessage() {
      const date = new Date();
      const currentHour = date.getHours();

      let greetingMessage;
      if (currentHour < 12) {
        greetingMessage = `Good Morning, ${user.fullName}. Hope you have a great day!`;
      } else if (currentHour < 18) {
        greetingMessage = `Good afternoon, ${user.fullName}`;
      } else {
        greetingMessage = `Good evening, ${user.fullName}. Are you still working? great, hope you take care of your healthy too!`;
      }

      setGreeting(greetingMessage);
      setCurrentTime(date.toLocaleTimeString());
    }

    setGreetingMessage();

    const interval = setInterval(() => {
      setGreetingMessage();
    }, 1000);

    return () => clearInterval(interval);
  }, [user]);

  return (
    <section className="dashboard">
      <div className="box box1">
        {user ? (
          <div>
            <h2 className="section__DarkTitle">
              WELLCOME, <strong> {user.fullName}</strong>
            </h2>
            <p>{greeting}</p>
            <p>Current time: {currentTime}</p>
          </div>
        ) : null}
      </div>
      <div className="box box2">
        <ReservationForecast />
      </div>
      <div className="box box3">
        <ActualData />
      </div>
    </section>
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
