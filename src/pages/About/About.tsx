import { Link } from "react-router-dom";
import "./about.scss";

const About = () => {
  return (
    <section className="about">
      <div className="section__Content">
        <div className="container about__Content">
        <h1 className="section__DefaultTitle">About Booking Application</h1>
          <p>
            Welcome to the Room Booking Application! Our platform provides an
            easy and convenient way to book rooms for various purposes, whether
            it's for meetings, events, or any other gatherings.
          </p>
          <div className="about-card">
            <h2 className="content__Title">Features</h2>
            <ul>
              <li className="content__SubTitle">
                User Registration and Authentication:
              </li>
              <li>
                Room Booking: Browse available rooms, view details, and book
                rooms for your events or meetings.
              </li>
              <li>
                Admin Dashboard: Admin users have access to a dashboard where
                they can manage rooms, bookings, and user accounts.
              </li>
              <li>
                Reservation Forecast: View forecasts of room availability for
                better planning.
              </li>
              <li>
                Period Details: Get detailed information about specific booking
                periods.
              </li>
            </ul>
          </div>
          <div className="about-card">
            <h2 className="content__Title">How to Get Started</h2>
            <ol>
              <li className="content__SubTitle">
                If you're new to the application,{" "}
                <Link to="/register">register here</Link> to create an account.
              </li>
              <li>
                If you already have an account, <Link to="/login">log in</Link>{" "}
                to start booking rooms.
              </li>
              <li>
                Once logged in, you can navigate to the "Rooms" section to view
                available rooms and make bookings.
              </li>
              <li>
                Admin users can access additional features from the dashboard
                after logging in.
              </li>
            </ol>
            <p>
              Thank you for choosing our Room Booking Application. If you have
              any questions or feedback, feel free to{" "}
              <Link to="/contact">contact us</Link>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
