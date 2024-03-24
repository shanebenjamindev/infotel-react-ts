import { useState } from "react";
import "./home.scss"; // Import your custom CSS file

const Home = () => {
  const [location, setLocation] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState<number>(0);

  const handleSearch = (event: any) => {
    event.preventDefault();
    console.log(
      "Performing search with location:",
      location,
      "Check-in:",
      checkInDate,
      "Check-out:",
      checkOutDate,
      "Guests:",
      guests
    );
  };

  return (
    <section className="bg3">
      <div className="container">
        <h1 className="mt-5">Hotel Booking</h1>
        <form onSubmit={handleSearch} className="mt-3">
          <div className="row">
            <div className="col-md-4 mb-3">
              <label>Select Location</label>
              <input
                type="text"
                className="form-control"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="col-md-3 mb-3">
              <label>Start date</label>
              <input
                type="date"
                className="form-control"
                placeholder="Check-in Date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
              />
            </div>
            <div className="col-md-3 mb-3">
              <label>End date</label>
              <input
                type="date"
                className="form-control"
                placeholder="Check-out Date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
              />
            </div>
            <div className="col-md-2 mb-3">
              <label>Guest</label>
              <input
                type="number"
                className="form-control"
                placeholder="Guests"
                min="1"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value, 10))}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default Home;
