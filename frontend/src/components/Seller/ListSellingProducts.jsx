import { useEffect, useState } from "react";
import fileServices from "../../services/fileServices";
import SellerProductBox from "../Seller/SellerProducBox";

const ListSellingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fileServices.getSellingProduct().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (products.length === 0) return <p>No selling products found.</p>;

  return (
    <div className="flex flex-wrap gap-5 p-5">
      {products.map((p) => (
        <SellerProductBox
          key={p._id}
          img={p.images?.[0]}
          title={p.name}
          quantity={p.quantity}
          price={p.price}
        />
      ))}
    </div>
  );
};

export default ListSellingProducts;
