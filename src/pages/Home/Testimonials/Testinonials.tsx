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
        "I've used this booking site multiple times, and it never disappoints. The 24/7 availability is a huge plus!",
    },
    {
      name: "Jane Smith",
      quote:
        "I've used this booking site multiple times, and it never disappoints. The 24/7 availability is a huge plus!",
    },
  ];

  return (
    <section className="testimonials ">
      <h1 className="testimonials-title">Happy Customers</h1>
      <h3 className="testimonials-subtitle">
        Read what our customers have to say about us
      </h3>
      <div className="px-4 testimonial-list d-md-flex" style={{ gap: "30px" }}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial ">
            <p className="testimonial-text">"{testimonial.quote}"</p>
            <p className="testimonial-author">- {testimonial.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
