import { ShoppingCart } from "lucide-react";

const Kart = () => {
  return (
    <div className="flex gap-2 items-center rounded-md bg-green-700 p-2 text-white">
      <div>
        <ShoppingCart />
      </div>
      <div className="font-semibold">
        <div className="leading-4">{"2"} items</div>
        <div className="leading-4">₹{"158"}</div>
      </div>
    </div>
  );
};

export default Kart;
