import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reduxStore from "./redux/store.js";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App.jsx";
import AuthWrapper from "./components/AuthWrapper.jsx";
import { Home, Login, Signup } from "./Pages/index.js";
import MyProducts from "./components/Seller/MyProducts.jsx";
import UploadProduct from "./components/Seller/UploadProduct.jsx";
import ListSellingProducts from "./components/Seller/ListSellingProducts.jsx";
import BecomeSeller from "./components/Accounts/BecomeSeller.jsx";
import MyAddresses from "./components/Accounts/MyAddresses.jsx";
import SearchPage from "./Pages/SearchPage.jsx";

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
      {
        path: "addresses",
        element: (
          <AuthWrapper>
            <MyAddresses />
          </AuthWrapper>
        ),
      },
    ],
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/seller-registration",
    element: (
      <AuthWrapper>
        <BecomeSeller />
      </AuthWrapper>
    ),
  },
  {
    path: "/sell-products",
    element: (
      <AuthWrapper>
        <MyProducts />
      </AuthWrapper>
    ),
    children: [
      {
        path: "",
        element: (
          <AuthWrapper>
            <ListSellingProducts />
          </AuthWrapper>
        ),
      },
      {
        path: "upload-product",
        element: (
          <AuthWrapper>
            <UploadProduct />
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
