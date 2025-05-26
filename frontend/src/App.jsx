import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import { Outlet } from "react-router-dom";
import { login, logout } from "./redux/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import authService from "./services/authService.js";
import Loading from "./components/Loading.jsx";
import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const isUserLogin = useSelector((state) => state.auth?.status);

  useEffect(() => {
    if (isUserLogin) {
      setLoading(false);
      return;
    }
    authService
      .getCurrentUser()
      .then((data) => {
        if (data) {
          dispatch(login(data));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <nav className="sticky top-0">
        <Navbar />
      </nav>
      <main className="w-[90%] mx-auto">
        {loading ? <Loading /> : <Outlet />}
      </main>
    </>
  );
};

export default App;
