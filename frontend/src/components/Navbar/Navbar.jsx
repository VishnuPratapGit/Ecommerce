import SearchBar from "./SearchBar";
import Address from "./Address";
import Logo from "./Logo";
import Kart from "./Kart";

const Navbar = () => {
  return (
    <div className="flex backdrop-blur-lg justify-around items-center border-b border-neutral-700 py-5">
      <Logo />
      <Address />
      <SearchBar />
      <div>Login</div>
      <Kart />
    </div>
  );
};

export default Navbar;
