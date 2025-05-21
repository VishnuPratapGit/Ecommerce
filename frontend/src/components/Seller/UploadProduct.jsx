import { useState } from "react";
import fileServices from "../../services/fileServices";
import ProductDetails from "./ProductDetails";
import ProductImageUploader from "./ProductImageUploader";

const UploadProduct = () => {
  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState([]);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    quantity: "",
    price: "",
    category: "",
  });

  const handleSubmit = async () => {
    // Validate product fields
    for (const [key, value] of Object.entries(productData)) {
      if (key !== "description" && !value.trim()) {
        alert(`Please fill the "${key}" field.`);
        return;
      }
    }

    // Validate price and quantity
    const price = parseFloat(productData.price);
    if (isNaN(price) || price <= 0) {
      alert("Price must be a valid positive number.");
      return;
    }

    if (!images || images.length === 0) {
      alert("Minimum one image is required.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      // append product data
      Object.entries(productData).forEach(([key, value]) =>
        formData.append(key, value)
      );

      // append images
      images.forEach((imgObj) => {
        formData.append("images", imgObj.file);
      });

      const data = await fileServices.uploadProduct(formData);

      if (data) {
        console.log(data);
        alert("Upload Successful");
        setImages([]);
        setProductData({
          name: "",
          description: "",
          quantity: "",
          price: "",
          category: "",
        });
      } else {
        alert("Upload Failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred during upload.");
    } finally {
      setLoading(false); // Ensures it's always reset, even on error
    }
  };

  return (
    <div className="flex flex-col w-[80%] m-auto">
      <div className="flex gap-10">
        <ProductDetails
          productData={productData}
          setProductData={setProductData}
        />
        <ProductImageUploader images={images} setImages={setImages} />
      </div>
      <button
        disabled={loading}
        onClick={handleSubmit}
        className="mx-5 mb-5 bg-emerald-500 text-white px-6 py-2 rounded-md hover:bg-emerald-600"
      >
        {loading ? "Loading..." : "Submit Product"}
      </button>
    </div>
  );
};

export default UploadProduct;
