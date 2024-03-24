import "./hero.scss";
export default function Hero() {
  return (
    <section className="hero ">
      <div className="hero-content">
        <div>
          <h1>Welcome to Infotel</h1>
          <p>Escape to Paradise: Your Ultimate Getaway Awaits!</p>
          <p>
            Indulge in luxury, bask in tranquility, and create unforgettable
            memories. Whether it's a romantic retreat, a family adventure, or a
            solo exploration, we have tailored experiences just for you.
            Discover our exclusive offers and start planning your perfect
            vacation today!
          </p>
        </div>
        <div>
          <button className="btn__Light">Book Now</button>
        </div>
      </div>
    </section>
  );
}
