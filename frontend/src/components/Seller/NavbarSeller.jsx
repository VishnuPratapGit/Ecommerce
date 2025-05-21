import Logo from "../Logo";
import SellBtn from "./SellBtn";
import SearchSeller from "./SearchSeller";
import { Link } from "react-router-dom";

const NavbarSeller = () => {
  return (
    <div className="min-h-20 flex backdrop-blur-lg justify-between items-center border-b border-neutral-700 p-1 px-5">
      <Link to={"/sell-products"}>
        <Logo />
      </Link>
      {/* <SearchSeller /> */}
      <SellBtn />
    </div>
  );
};

export default NavbarSeller;
