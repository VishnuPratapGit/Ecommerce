import { useState, useEffect, useRef } from "react";
import { BiSolidDownArrow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authService from "../../services/authService.js";
import { logout as reduxLogout } from "../../redux/authSlice";
import AccountOptions from "./AccountOptions";

const AccountDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth?.userData);

  const dropdownRef = useRef(null);

  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(reduxLogout());
      navigate("/login");
    });
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-default items-center justify-between gap-2 w-full px-4 py-3 text-left rounded-md"
      >
        <span className="font-semibold text-lg">
          {userData?.name || "Accounts"}
        </span>
        <BiSolidDownArrow className="cursor-pointer" />
      </div>

      {isOpen && (
        <div className="absolute cursor-pointer overflow-hidden z-10 w-60 right-0 py-2 mt-1 bg-gray-100 border-gray-300 rounded-2xl shadow-lg">
          <div
            onClick={() => navigate("/account/profile")}
            className="font-semibold px-4 py-2 text-neutral-700 hover:bg-gray-200"
          >
            My Accounts
          </div>
          <div onClick={() => setIsOpen(false)} className="py-1">
            <AccountOptions
              onClick={() => navigate("/orders")}
              option="My Orders"
            />

            <AccountOptions
              onClick={() => navigate("/addresses")}
              option="Saved Addresses"
            />

            {userData.isSeller ? (
              <AccountOptions
                onClick={() => navigate("/sell-products")}
                option={"My Products"}
              />
            ) : (
              <AccountOptions
                onClick={() => navigate("/seller-registration")}
                option={"Become a seller"}
              />
            )}

            <AccountOptions onClick={handleLogout} option="Log Out" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
