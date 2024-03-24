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
    <section className="bg px-3">
      <div className="overlay__Inner"></div>
      <div className="d-md-flex login__Container d-md-flex">
        
        <div className="rounded w-50 home__LoginForm">
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
              <div className="text-center d-flex pt-1 mb-5 pb-1">
                <a className="text-muted col-6" href="#!">
                  Forgot password?
                </a>
                <button className="btn__Primary col-6" onClick={handleLogin}>
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
