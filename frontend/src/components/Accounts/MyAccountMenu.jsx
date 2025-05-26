import React from "react";
import { MoveRight, User } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const MyAccountMenu = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => navigate("orders")}
        className="flex hover:text-gray-300 justify-between p-3 font-medium border-b border-neutral-600 cursor-pointer"
      >
        <div>MY ORDERS</div>
        <div className="">
          <MoveRight />
        </div>
      </div>
      <div className="p-3 font-medium border-b border-neutral-600">
        ACCOUNT SETTINGS
      </div>
      <div className="text-neutral-400 pl-4 flex flex-col">
        <NavLink
          to="profile"
          className={({ isActive }) =>
            isActive ? "text-white p-2" : "text-neutral-400 p-2"
          }
        >
          Profile Information
        </NavLink>
        <NavLink
          to="address"
          className={({ isActive }) =>
            isActive ? "text-white p-2" : "text-neutral-400 p-2"
          }
        >
          Manage Addresses
        </NavLink>
      </div>
    </>
  );
};

export default MyAccountMenu;
