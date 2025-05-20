import { Timer } from "lucide-react";
import AddToCartBtn from "./AddToCartBtn";

const ProductBox = ({
  title,
  quantity,
  price,
  img = "./src/assets/amul.avif",
}) => {
  return (
    <div className="w-48 border border-neutral-700 rounded-lg shrink-0 overflow-hidden">
      <div className="w-full flex justify-center align-center bg-white">
        <img className="h-40" src={img} />
      </div>
      <div className="flex flex-col gap-1 p-4">
        <div className="text-[10px] flex gap-1 align-center font-semibold bg-slate-100 p-1 rounded-md w-max text-black">
          <Timer size={12} />
          {"9 MINS"}
        </div>
        <div className="text-sm my-2 font-bold">{title}</div>
        <div className="text-neutral-300 text-sm">{quantity}</div>
        <AddToCartBtn price={price} />
      </div>
    </div>
  );
};

export default ProductBox;
