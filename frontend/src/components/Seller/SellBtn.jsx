import React from "react";
import { Link } from "react-router-dom";

const SellBtn = () => {
  return (
    <Link
      to={"upload-product"}
      className="rounded-xl cursor-pointer hover:bg-purple-700 text-lg px-4 py-2 bg-purple-600"
    >
      Add Product
    </Link>
  );
};

export default SellBtn;
