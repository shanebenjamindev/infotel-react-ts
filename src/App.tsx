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

function App() {
  const LayoutHome = () => {
    return (
      <div className="main bg">
        <Header />
        <div className="">
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
        <div className="d-flex">
          <Sidebar />
          <Outlet />
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
      children: [{ path: "", element: <Admin /> }, {}],
    },
  ]);
  return (
    <Suspense fallback={<>Loading...</>}>
      <RouterProvider router={router}></RouterProvider>
    </Suspense>
  );
}

export default App;
