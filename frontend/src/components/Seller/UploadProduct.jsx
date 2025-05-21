import { useState } from "react";
import fileServices from "../../services/fileServices";
import ProductDetails from "./ProductDetails";
import ProductImageUploader from "./ProductImageUploader";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

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

  const navigate = useNavigate();

  const handleSubmit = async () => {
    // Validate product fields
    for (const [key, value] of Object.entries(productData)) {
      if (key !== "description" && !value.trim()) {
        toast(`Please fill the "${key}" field.`);
        return;
      }
    }

    if (!images || images.length === 0) {
      toast("Minimum one image is required.");
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
        navigate("/sell-products");
      } else {
        toast.error("Upload Failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("An error occurred during upload.");
    } finally {
      setLoading(false);
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
      <ToastContainer position="top-center" theme="dark" />
    </div>
  );
};

export default UploadProduct;
