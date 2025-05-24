import { useEffect, useState } from "react";
import ListCategoriesAtHome from "../components/ItemSection/ListCategoriesAtHome";
import ItemSectionTemplate from "../components/ItemSection/SectionTemplate";
import fileServices from "../services/fileServices";
import { useDispatch, useSelector } from "react-redux";
import { setProducts as setProductsRedux } from "../redux/categoryProducts";

const categories = [
  "dairy-bread",
  "snacks-munchies",
  "sweet-tooth",
  "cold-drinks-juices",
];

const Home = () => {
  const products = useSelector((state) => state.categoryProducts?.products);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products || products.length === 0) {
      setLoading(true);
      fileServices.groupedByCategory(categories).then((productsList) => {
        dispatch(setProductsRedux(productsList));
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div>
      <ListCategoriesAtHome />

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
