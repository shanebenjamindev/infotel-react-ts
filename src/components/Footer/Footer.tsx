import "./footer.scss";
export default function Footer() {
  return (
    <section>
      <div className="bg section__Content text-center py-4">
        <div className="container">
          <h2 className="section__DefaultTitle">Subscribe to Our Newsletter</h2>
          <p className="content__FadeTitle">Get the latest news and updates straight to your inbox!</p>
          <form>
            <div className="d-md-flex m-auto" style={{ gap: "5px" }}>
              <input
                className="col-md-9 form-control"
                type="email"
                id="email"
                placeholder="Your email address"
                required
              />
              <button className="col-md-3 btn__Primary">Subscribe</button>
            </div>
          </form>
        </div>
      </div>
      <footer className="site-footer">
        <div className="footer-top container p-5 d-md-flex justify-content-around">
          <div className="footer-nav">
            <h3>Explore</h3>
            <ul>
              <li>
                <a href="#">Countries</a>
              </li>
              <li>
                <a href="#">Cities</a>
              </li>
              <li>
                <a href="#">Hotels</a>
              </li>
              <li>
                <a href="#">Flights</a>
              </li>
              <li>
                <a href="#">Car Rentals</a>
              </li>
              <li>
                <a href="#">Travel Guides</a>
              </li>
            </ul>
          </div>
          <div className="footer-nav">
            <h3>Accommodation</h3>
            <ul>
              <li>
                <a href="#">Houses</a>
              </li>
              <li>
                <a href="#">Apartments</a>
              </li>
              <li>
                <a href="#">Resorts</a>
              </li>
              <li>
                <a href="#">Villas</a>
              </li>
              <li>
                <a href="#">Hostels</a>
              </li>
              <li>
                <a href="#">Bed and Breakfasts</a>
              </li>
            </ul>
          </div>
          <div className="footer-nav">
            <h3>Company</h3>
            <ul>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Press</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom text-center">
          <p>
            &copy; 2024 P.A INFOTEL COMPANY LIMITED. All rights reserved. |
            Designed by{" "}
            <a href="https://www.facebook.com/profile.php?id=100012829152690">
              Vo Giang
            </a>
          </p>
        </div>
      </footer>
    </section>
  );
}
