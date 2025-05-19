import SearchBar from "./SearchBar";
import Address from "./Address";
import Logo from "./Logo";
import Kart from "./Kart";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const loggedStatus = useSelector((state) => state.auth?.status);

  return (
    <div className="flex backdrop-blur-lg justify-around items-center border-b border-neutral-700 py-5">
      <Logo />
      <Address />
      <SearchBar />
      {!loggedStatus && <Link to="/login">Login</Link>}
      <Kart />
    </div>
  );
};

export default Navbar;
