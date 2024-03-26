import "./testinoials.scss"; // Import CSS file for styling

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      quote:
        "Booking my vacation was a breeze! The process was quick and easy, and I got instant confirmation. Highly recommended!",
    },
    {
      name: "Jane Smith",
      quote:
        "I've used this booking site multiple times, and it never disappoints. The 24/7 availability is a huge plus!",
    },
    {
      name: "Jane Smith",
      quote:
        "I've used this booking site multiple times, and it never disappoints.",
    },
    {
      name: "Jane Smith",
      quote:
        "I've used this booking site multiple times, and it never disappoints. The 24/7 availability is a huge plus!",
    },
  ];

  return (
    <section className="testimonials">
      <div className="section__Content">
        <h1 className="testimonials-title section__DefaultTitle">
          Happy Customers
        </h1>
        <h3 className="content__FadeTitle">
          Read what our customers have to say about us
        </h3>
        <div className="container-fluid">
          <div className="row justify-content-center">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="col-md-3 my-2">
                <div className="testimonial">
                  <p className="testimonial-text">"{testimonial.quote}"</p>
                  <p className="testimonial-author">- {testimonial.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
