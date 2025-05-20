import React from "react";
import NavbarSeller from "./NavbarSeller";
import { Outlet } from "react-router-dom";

const MyProducts = () => {
  return (
    <>
      <nav className="">
        <NavbarSeller />
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MyProducts;
