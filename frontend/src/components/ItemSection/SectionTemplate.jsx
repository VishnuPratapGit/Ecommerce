import "./section.css";
import ProductBox from "./ProductBox";
import { useEffect, useState } from "react";

const SectionTemplate = ({ title, loading, products }) => {
  if (loading) return <p>Loading products...</p>;
  const [newTitle, setNewTitle] = useState();

  useEffect(() => {
    setNewTitle(
      title
        .split("-")
        .map((str) => str[0].toUpperCase() + str.slice(1))
        .join(" & ")
    );
  }, []);

  return (
    <div className="p-4">
      <div className="text-2xl font-semibold mb-5">{newTitle}</div>
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
