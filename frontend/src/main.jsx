import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reduxStore from "./redux/store.js";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App.jsx";
import AuthWrapper from "./components/AuthWrapper.jsx";
import { Home, Login, Signup } from "./Pages/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <AuthWrapper>
            <Home />
          </AuthWrapper>
        ),
      },
      {
        path: "login",
        element: (
          <AuthWrapper authenticate={false}>
            <Login />
          </AuthWrapper>
        ),
      },
      {
        path: "signup",
        element: (
          <AuthWrapper authenticate={false}>
            <Signup />
          </AuthWrapper>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={reduxStore}>
    <RouterProvider router={router} />
  </Provider>
);
