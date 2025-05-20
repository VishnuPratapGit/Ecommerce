class FileServices {
  constructor() {
    this.BASE_URL = import.meta.env.VITE_API_URL;
  }

  async uploadProduct(formData) {
    try {
      const res = await fetch(`${this.BASE_URL}/api/v1/products/upload`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return false;
      } else {
        return data;
      }
    } catch (err) {
      console.error("Upload failed", err);
      return false;
    }
  }

  async getSellingProduct() {
    try {
      const response = await fetch(
        `${this.BASE_URL}/api/v1/products/get-products`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return false;
      } else {
        return data.products;
      }
    } catch (error) {
      console.error("Products fetch failed", error);
      return false;
    }
  }

  async getAllProducts() {
    try {
      const response = await fetch(
        `${this.BASE_URL}/api/v1/products/get-all-products`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return false;
      } else {
        return data.products;
      }
    } catch (error) {
      console.error("Products fetch failed", error);
      return false;
    }
  }
}

const fileServices = new FileServices();

export default fileServices;
