import "./section.css";
import ProductBox from "./ProductBox";
import fileServices from "../../services/fileServices";
import { useEffect, useState } from "react";
const SectionTemplate = ({ title }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fileServices.getAllProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="p-4">
      <div className="text-2xl font-semibold">{title}</div>
      <div className="flex overflow-x-auto py-2 gap-5 scroll-hidden">
        {products.map((p) => (
          <ProductBox
            key={p._id}
            img={p.images?.[0]}
            title={p.name}
            quantity={p.quantity}
            price={p.price}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionTemplate;
