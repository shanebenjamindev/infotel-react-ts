import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import { Suspense } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import Sidebar from "./components/AdminComponent/Sidebar/Sidebar";
import ErrorPage from "./pages/Error/Error";
import "./styles/global.scss";
import ActualData from "./components/AdminComponent/ActualData/ActualData";
import ReservationForecast from "./components/AdminComponent/ReservationForecast/ReservationForecast";
import { getUser } from "./hooks/userHook";
import About from "./pages/About/About";
import Admin from "./pages/Admin/Admin";

function App() {
  const LayoutHome = () => {
    return (
      <div className="main">
        <Header />
        <div className="">
          <Outlet />
        </div>
        <Footer />
      </div>
    );
  };

  const LayoutAdmin = () => {
    const user = getUser();

    if (user) {
      return (
        <div className="main">
          {user?.role === "admin" ? (
            <div className="admin__Container d-md-flex ">
              <div className="admin__Content col-md-2 pl-0 ">
                <Sidebar />
              </div>
              <div className="admin__Content col-md-10 p-2">
                <Outlet />
              </div>
            </div>
          ) : (
            <>You do not have permission to access this page</>
          )}
        </div>
      );
    } else {
      return (
        <p className="text-center p-5">
          Please <Link to="/login">click here</Link> to login first
        </p>
      );
    }
  };

  const router = createBrowserRouter([
    {
      path: "",
      element: <LayoutHome />,
      children: [
        { path: "", element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "about", element: <About /> },
      ],
    },
    {
      path: "admin",
      element: <LayoutAdmin />,
      children: [
        { path: "", element: <Admin /> },
        { path: "actualData", element: <ActualData /> },
        { path: "reservationForecast", element: <ReservationForecast /> },
        {
          path: "*",
          element: <ErrorPage errorCode={404} errorMessage="Page not found" />,
        },
      ],
    },
    {
      path: "*",
      element: <ErrorPage errorCode={404} errorMessage="Page not found" />,
    },
  ]);

  return (
    <Suspense fallback={<>Loading...</>}>
      <RouterProvider router={router}></RouterProvider>
    </Suspense>
  );
}

export default App;
