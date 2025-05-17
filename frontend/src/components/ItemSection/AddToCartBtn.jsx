import CartItemAddRemove from "./CartItemAddRemove";
import { useState } from "react";

const AddToCartBtn = ({ price }) => {
  const [added, setAdded] = useState(0);

  return (
    <div className="flex justify-between items-center">
      <div className="text-sm font-semibold">₹{price}</div>
      {added > 0 ? (
        <CartItemAddRemove added={added} setAdded={setAdded} />
      ) : (
        <div
          onClick={() => setAdded(1)}
          className="rounded-md cursor-pointer border text-sm border-green-600 text-green-600 p-2 px-5 font-semibold"
        >
          ADD
        </div>
      )}
    </div>
  );
};

export default AddToCartBtn;
