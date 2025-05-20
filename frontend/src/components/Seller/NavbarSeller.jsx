import Logo from "../Logo";
import SellBtn from "./SellBtn";
import SearchSeller from "./SearchSeller";

const NavbarSeller = () => {
  return (
    <div className="min-h-20 flex backdrop-blur-lg justify-between items-center border-b border-neutral-700 p-2 px-5">
      <Logo />
      <SearchSeller />
      <SellBtn />
    </div>
  );
};

export default NavbarSeller;
