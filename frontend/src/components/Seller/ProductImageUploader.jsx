import { CloudUpload } from "lucide-react";
import ImagePreviews from "./ImagePreviews";

const ProductImageUploader = ({ images, setImages }) => {
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (images.length + selectedFiles.length > 5) {
      alert("You can only upload up to 5 images.");
      return;
    }

    const updatedImages = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...updatedImages]);
  };

  const removeImage = (index) => {
    const toRevoke = images[index].preview;
    URL.revokeObjectURL(toRevoke); // Clean up
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const replaceImage = (index, e) => {
    if (e.target.files && e.target.files[0]) {
      const newFile = e.target.files[0];
      const newPreview = URL.createObjectURL(newFile);

      // Clean up old preview
      URL.revokeObjectURL(images[index].preview);

      const updated = [...images];
      updated[index] = { file: newFile, preview: newPreview };
      setImages(updated);
    }
  };

  return (
    <div className="p-6 w-full space-y-6">
      <h2 className="text-lg font-semibold">Product Images</h2>

      <div className="border-2 border-neutral-500 border-dashed rounded-lg p-6 text-center transition-colors">
        <div className="flex flex-col items-center justify-center space-y-2">
          <label
            className="font-medium text-emerald-500 hover:text-emerald-600 cursor-pointer"
            htmlFor="file-upload"
          >
            <CloudUpload size={100} strokeWidth={1} className="text-gray-600" />
            Click to upload
          </label>
          <p className="text-xs text-neutral-400">PNG, JPG, or JPEG (Max 5)</p>
        </div>

        <input
          type="file"
          id="file-upload"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {images.length > 0 && (
        <ImagePreviews
          images={images}
          removeImage={removeImage}
          replaceImage={replaceImage}
        />
      )}
    </div>
  );
};

export default ProductImageUploader;
