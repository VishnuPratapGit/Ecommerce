import React, { useEffect, useState } from "react";
import ProductBox from "../components/ItemSection/ProductBox";
import { useSelector, useDispatch } from "react-redux";
import { setProducts as setProductsRedux } from "../redux/productSlice";
import fileServices from "../services/fileServices";
import Navbar from "../components/Navbar/Navbar";

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const allProducts = useSelector((state) => state.products?.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const filterProducts = (keyword) => {
      if (!allProducts) return;
      const filteredItems = allProducts.filter((item) =>
        item.name.toLowerCase().includes(keyword.toLowerCase())
      );
      setProducts(filteredItems);
    };

    filterProducts(search);
  }, [search, allProducts]);

  useEffect(() => {
    if (!allProducts || allProducts.length === 0) {
      fileServices.getAllProducts().then((data) => {
        dispatch(setProductsRedux(data));
        setProducts(data);
      });
    }
    if (allProducts) setProducts(allProducts);
  }, []);

  return (
    <>
      <div className="sticky top-0">
        <Navbar search={search} setSearch={setSearch} />
      </div>
      <div>
        <h2 className="p-5 pb-0 font-semibold">
          Showing results for "{search || "all"}"
        </h2>
        <div className="flex flex-wrap gap-5 p-5">
          {products.map((p) => (
            <ProductBox
              key={p._id}
              title={p.name}
              quantity={p.quantity}
              price={p.price}
              img={p.images?.[0]}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
