import React from "react";
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import { Suspense } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import Sidebar from "./components/Sidebar/Sidebar";
import ErrorPage from "./pages/Error/Error";
import "./assets/scss/global.scss";
import "./app.scss";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import ActualData from "./pages/ActualData/ActualData";
import ReservationForecast from "./pages/Admin/ReservationForecast/ReservationForecast";
import PeriodDetail from "./pages/Admin/PeriodDetail/PeriodDetail";
import { getUser } from "./hooks/userHook";
import About from "./pages/About/About";

function App() {
  const LayoutHome = () => {
    return (
      <div className="main">
        <Header />
        <div className="content">
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
          <Header />
          {user?.role === "admin" ? (
            <div className="d-md-flex" style={{ height: "100%" }}>
              <div className="col-md-2">
                <Sidebar />
              </div>
              <div className="col-md-10 p-2">
                <Outlet />
              </div>
            </div>
          ) : (
            <>You have not permission</>
          )}

          <Footer />
        </div>
      );
    } else {
      return (
        <p className=" text-center p-5">
          Please, <Link to="/login">Click here </Link> to login first
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
        { path: "", element: <Dashboard /> },
        { path: "actualData", element: <ActualData /> },
        { path: "reservationForecast", element: <ReservationForecast /> },
        { path: "periodDetail", element: <PeriodDetail /> },
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
