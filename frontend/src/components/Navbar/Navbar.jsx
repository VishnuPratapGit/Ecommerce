import SearchBar from "./SearchBar";
import Address from "./Address";
import Logo from "../Logo";
import Kart from "./Kart";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Accounts from "../Accounts/Accounts";

const Navbar = ({ search, setSearch }) => {
  const loggedStatus = useSelector((state) => state.auth?.status);

  return (
    <div className="flex bg-neutral-900 justify-around items-center border-b border-neutral-700 py-3">
      <Link to={"/"}>
        <Logo />
      </Link>
      <Address />
      <SearchBar search={search} setSearch={setSearch} />
      {!loggedStatus ? <Link to="/login">Login</Link> : <Accounts />}
      <Kart />
    </div>
  );
};

export default Navbar;
