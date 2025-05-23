import React from "react";
import { Link } from "react-router-dom";

const SellBtn = () => {
  return (
    <Link
      to={"upload-product"}
      className="rounded-lg cursor-pointer hover:bg-emerald-500 text-lg px-4 py-2 bg-emerald-600"
    >
      Add Product
    </Link>
  );
};

export default SellBtn;
