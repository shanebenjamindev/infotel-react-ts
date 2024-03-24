import { useState } from "react";
import "./booking.scss";
export default function Booking() {
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
    <div className="booking__Container">
      <div className="booking__Contain">
        <div className="w-75 m-auto">
          <h1 className="section__Title">Hotel Booking</h1>
          <form onSubmit={handleSearch} className="mt-2">
            <div className="row">
              <div className="col-md-4 mb-2">
                <label>Select Location</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="col-md-2 mb-2">
                <label>Start date</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Check-in Date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                />
              </div>
              <div className="col-md-2 mb-2">
                <label>End date</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Check-out Date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                />
              </div>
              <div className="col-md-2 mb-2">
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
              <div className="col-md-2 d-flex justify-content-center align-items-center">
                <button className="btn__Primary">Search</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
