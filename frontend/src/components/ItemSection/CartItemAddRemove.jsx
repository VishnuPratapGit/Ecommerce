import { Minus, Plus } from "lucide-react";

const CartItemAddRemove = ({ added, setAdded }) => {
  return (
    <div className="flex cursor-pointer items-center gap-2 rounded-md text-sm bg-green-700 p-2 px-3 font-semibold">
      <button
        onClick={() => added > 0 && setAdded(added - 1)}
        className="cursor-pointer"
      >
        <Minus size={12} />
      </button>
      <div>{added}</div>
      <button onClick={() => setAdded(added + 1)} className="cursor-pointer">
        <Plus size={12} />
      </button>
    </div>
  );
};

export default CartItemAddRemove;
