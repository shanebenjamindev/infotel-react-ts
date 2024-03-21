export default function Login() {
  return (
    <section className="p-5">
      <div className="d-md-flex">
        <div className=" col-lg-8 d-flex align-items-center gradient-custom-2">
          <div className="text-white px-3 py-4 p-md-5 mx-md-4">
            <h4 className="mb-4">We are more than just a company</h4>
            <p className="small mb-0">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
        <div className="rounded col-lg-4 home__LoginForm">
          <div className="card-body text-center p-md-5 mx-md-4">
            <div className="text-center">
              <h2>Login</h2>
            </div>
            <form className="my-5">
              <div className="form-group">
                <input
                  type="email"
                  id="form2Example11"
                  className="form-control"
                  placeholder="Phone number or email address"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="form2Example22"
                  className="form-control"
                  placeholder="Password"
                />
              </div>
              <div className="text-center pt-1 mb-5 pb-1">
                <button
                  className="btn btn-dark btn-block fa-lg gradient-custom-2 mb-3"
                  type="button"
                >
                  Log in
                </button>
                <a className="text-muted" href="#!">
                  Forgot password?
                </a>
              </div>
              <div className="d-flex align-items-center justify-content-center pb-4">
                <p className="mb-0 me-2">Don't have an account?</p>
                <button type="button" className="btn border ml-auto">
                  Create new
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
