import React from "react";
import { RefreshCcw, Trash2 } from "lucide-react";

const ImagePreviews = ({ images, removeImage, replaceImage }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((img, index) => (
        <div key={index} className="relative group">
          <img
            src={img.preview}
            alt={`Preview ${index}`}
            className="w-full h-32 object-cover rounded-lg border border-gray-200"
          />

          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100">
            <label className="cursor-pointer p-1 bg-white rounded-full shadow-sm hover:bg-gray-100">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => replaceImage(index, e)}
                className="hidden"
              />
              <RefreshCcw className="text-neutral-700" />
            </label>

            <button
              onClick={() => removeImage(index)}
              className="p-1 bg-white rounded-full shadow-sm hover:bg-gray-100"
            >
              <Trash2 className="text-neutral-700" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImagePreviews;
