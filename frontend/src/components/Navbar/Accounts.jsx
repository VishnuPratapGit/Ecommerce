import { useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";
import AccountOptions from "./AccountOptions";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { useDispatch } from "react-redux";
import { logout as reduxLogout } from "../../redux/authSlice";

const AccountDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Accounts");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(reduxLogout());
      navigate("/login");
    });
  };

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-default items-center justify-between gap-2 w-full px-4 py-3 text-left rounded-md"
      >
        <span className="font-semibold text-lg">{selectedOption}</span>
        <BiSolidDownArrow className="cursor-pointer" />
      </div>

      {isOpen && (
        <div className="absolute cursor-pointer overflow-hidden z-10 w-60 right-0 py-2 mt-1 bg-gray-100 border-gray-300 rounded-2xl shadow-lg">
          <div className="font-semibold px-4 py-2 text-neutral-700">
            My Accounts
          </div>
          <div className="py-1">
            <AccountOptions
              onClick={() => navigate("/orders")}
              option="My Orders"
            />
            <AccountOptions
              onClick={() => navigate("/addresses")}
              option="Saved Addresses"
            />
            <AccountOptions onClick={handleLogout} option="Log Out" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
