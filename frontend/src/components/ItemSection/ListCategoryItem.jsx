import React from "react";

const ListCategoryItem = ({
  title = "Dairy & Bread",
  img = "./src/assets/amul.avif",
}) => {
  return (
    <div className="flex flex-col justify-center items-center cursor-pointer">
      <img className="w-20 h-auto rounded-lg" src={img} />
      <div className="text-sm text-center mt-2 h-10">{title}</div>
    </div>
  );
};

export default ListCategoryItem;
