import React, { useEffect, useState } from "react";
import ListCategoryItem from "./ListCategoryItem";
import fileServices from "../../services/fileServices";

const ListCategoriesAtHome = React.memo(({ categories }) => {
  return (
    <div className="grid grid-cols-9 gap-5 my-10">
      {categories.map((category) => (
        <ListCategoryItem
          key={category._id}
          title={category.title}
          img={category.image}
        />
      ))}
    </div>
  );
});

export default ListCategoriesAtHome;
