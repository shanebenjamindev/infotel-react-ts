import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Admin from "./pages/Admin/Admin";
import { Suspense } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import Sidebar from "./components/Sidebar/Sidebar";
import "./assets/css/app.css";
import "./assets/scss/global.scss";
import Dashboard from "./pages/Dashboard/Dashboard";
import ActualData from "./pages/ActualData/ActualData";
import ResercationForecast from "./pages/ReservationForecast/LineChart";
import PeriodDetail from "./pages/PeriodDetail/PeriodDetail";

function App() {
  const LayoutHome = () => {
    return (
      <div className="main bg">
        <Header />
        <div className="content">
          <Outlet />
        </div>
        <Footer />
      </div>
    );
  };

  const LayoutAdmin = () => {
    return (
      <div className="main">
        <Header />
        <div className="d-flex" style={{ height: "93dvh" }}>
          <div className="col-2 bg-dark">
            <Sidebar />
          </div>
          <div className="col-10 p-2">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "",
      element: <LayoutHome />,
      children: [
        {
          path: "",
          element: <Login />,
        },
      ],
    },
    {
      path: "admin",
      element: <LayoutAdmin />,
      children: [
        { path: "", element: <Dashboard /> },
        { path: "actualData", element: <ActualData /> },
        { path: "reservationForecast", element: <ResercationForecast /> },
        { path: "periodDetail", element: <PeriodDetail /> },
      ],
    },
  ]);
  return (
    <Suspense fallback={<>Loading...</>}>
      <RouterProvider router={router}></RouterProvider>
    </Suspense>
  );
}

export default App;
