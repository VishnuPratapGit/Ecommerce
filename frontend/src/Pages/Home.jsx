import { useEffect, useState } from "react";
import ListCategoriesAtHome from "../components/ItemSection/ListCategoriesAtHome";
import ItemSectionTemplate from "../components/ItemSection/SectionTemplate";
import fileServices from "../services/fileServices";
import { useDispatch, useSelector } from "react-redux";
import { setProducts as setProductsRedux } from "../redux/categoryProducts";
import { setCategories } from "../redux/categorySlice";

const categories = [
  "dairy-bread",
  "snacks-munchies",
  "sweet-tooth",
  "cold-drinks-juices",
];

const Home = () => {
  const [loading, setLoading] = useState(true);
  const products = useSelector((state) => state.categoryProducts?.products);
  const catResponse = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products || products.length === 0) {
      setLoading(true);
      fileServices.groupedByCategory(categories).then((productsList) => {
        dispatch(setProductsRedux(productsList));
        setLoading(false);
      });
    }

    if (!catResponse.status) {
      fileServices.getAllCategories().then((data) => {
        dispatch(setCategories(data));
      });
    }

    setLoading(false);
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading products...
      </div>
    );

  return (
    <div>
      <ListCategoriesAtHome categories={catResponse?.categories} />

      {products.map((catObj) => (
        <ItemSectionTemplate
          key={catObj.category}
          title={catObj.category}
          products={catObj.products}
        />
      ))}
    </div>
  );
};

export default Home;
