import { Link } from "react-router-dom";
import "./about.scss"; // Import the CSS file for custom styles

const About = () => {
  return (
    <div className="bg2">
      <section className=" px-5 about-container d-md-flex">
        <div className="about-card">
          <h2>Features</h2>
          <ul>
            <li>
              User Registration and Authentication: Securely register and log in
              to your account to access booking features.
            </li>
            <li>
              Room Booking: Browse available rooms, view details, and book rooms
              for your events or meetings.
            </li>
            <li>
              Admin Dashboard: Admin users have access to a dashboard where they
              can manage rooms, bookings, and user accounts.
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
          <h2>How to Get Started</h2>
          <ol>
            <li>
              If you're new to the application,{" "}
              <Link to="/register">register here</Link> to create an account.
            </li>
            <li>
              If you already have an account, <Link to="/login">log in</Link> to
              start booking rooms.
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
            Thank you for choosing our Room Booking Application. If you have any
            questions or feedback, feel free to{" "}
            <Link to="/contact">contact us</Link>.
          </p>
        </div>
        <div className="text-white">
          <h1>About Booking Application</h1>
          <p>
            Welcome to the Room Booking Application! Our platform provides an
            easy and convenient way to book rooms for various purposes, whether
            it's for meetings, events, or any other gatherings.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
