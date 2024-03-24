import { useState } from "react";
import "./login.scss";
import { listAccount } from "../../data";
import { useNavigate } from "react-router-dom";
interface Account {
  username: string;
  password: string;
  email: string;
  role: string;
  fullName: string;
}

function login(username: string, password: string): Account | null {
  for (const accountGroup of listAccount) {
    if (
      accountGroup.admin.username === username &&
      accountGroup.admin.password === password
    ) {
      return accountGroup.admin;
    }

    const userAccount = accountGroup.users.find(
      (user) => user.username === username && user.password === password
    );
    if (userAccount) {
      return userAccount;
    }
  }
  return null;
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    const loggedInUser = login(username, password);

    if (loggedInUser) {
      if (loggedInUser.role === "admin") {
        alert("Login successful. welcome Admin");
        navigate("/admin");
      } else {
        alert("Login successful. welcome User");
        navigate("/");
      }
      localStorage.setItem("Login_User", JSON.stringify(loggedInUser));
    } else {
      setError("Incorrect username or password");
    }
  };

  return (
    <section className="bg content px-5">
      <div className="overlay__Inner"></div>
      <div className="d-md-flex">
        <div className="col-lg-8 d-flex align-items-center gradient-custom-2">
          <div className="text-white px-3 py-4 p-md-5 mx-md-4">
            <h4 className="mb-4">We are more than just a company</h4>
            <p className="">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
              amet consectetur, adipisicing elit. Ullam et sed sequi vel debitis
              quam asperiores, saepe nostrum eum totam eveniet, a deleniti fuga,
              temporibus omnis dignissimos quas facere tempora. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Minima vel esse
              mollitia nam ex dolorum, consequuntur labore rem ab ipsum
              molestias impedit voluptatem quos corporis distinctio quam eaque
              sed qui.
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
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="form2Example22"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              {error && <div className="text-danger mb-3">{error}</div>}
              <div className="text-center pt-1 mb-5 pb-1">
                <button
                  className="btn btn-dark btn-block fa-lg gradient-custom-2 mb-3"
                  type="submit"
                  onClick={handleLogin}
                >
                  Log in
                </button>
                <a className="text-muted" href="#!">
                  Forgot password?
                </a>
              </div>
              <div className="d-flex align-items-center justify-content-center pb-4">
                <p className="mb-0 me-2">Don't have an account?</p>
                <button
                  type="button"
                  className="btn btn-outline-dark border ml-auto"
                >
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
