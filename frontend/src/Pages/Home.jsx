import { useEffect, useState } from "react";
import ListCategoriesAtHome from "../components/ItemSection/ListCategoriesAtHome";
import ItemSectionTemplate from "../components/ItemSection/SectionTemplate";
import fileServices from "../services/fileServices";

const categories = [
  "dairy-bread",
  "snacks-munchies",
  "sweet-tooth",
  "cold-drinks-juices",
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fileServices.groupedByCategory(categories).then((productsList) => {
      setProducts(productsList);
      setLoading(false);
    });
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
