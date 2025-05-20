import Input from "../Input";
import { Textarea } from "../Textarea";
import Categories from "./Categories";

const ProductDetails = ({ productData, setProductData }) => {
  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-6 w-full space-y-6 overflow-y-auto">
      <h2 className="text-lg font-semibold sticky">Product Details</h2>
      <div className="flex flex-col p-4 gap-5 border-2 border-neutral-600 rounded-md">
        <Input
          name="name"
          value={productData.name}
          onChange={handleChange}
          className="border-2 border-neutral-600"
          placeholder="Product Name"
        />
        <Textarea
          name="description"
          value={productData.description}
          onChange={handleChange}
          placeholder="Product Description"
          rows={10}
        />
        <Input
          name="quantity"
          value={productData.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="border-2 border-neutral-600"
        />
        <Input
          name="price"
          value={productData.price}
          onChange={handleChange}
          placeholder="Price"
          className="border-2 border-neutral-600"
        />
        <Categories
          value={productData.category}
          onChange={(val) => setProductData({ ...productData, category: val })}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
