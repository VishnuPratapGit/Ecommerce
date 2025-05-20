import React from "react";

const SellerProducBox = ({
  title,
  quantity,
  price,
  img = "./src/assets/amul.avif",
}) => {
  return (
    <div className="w-48 border hover:border-neutral-600 hover:scale-105 transition-all duration-300 border-neutral-700 rounded-lg shrink-0 overflow-hidden">
      <div className="w-full flex justify-center align-center bg-white">
        <img className="h-40" src={img} />
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div className="text-sm font-bold">{title}</div>
        <div className="text-neutral-300 text-sm">{quantity}</div>
        <div className="text-sm font-semibold">₹{price}</div>
      </div>
    </div>
  );
};

export default SellerProducBox;
