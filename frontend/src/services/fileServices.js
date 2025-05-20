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
}

const fileServices = new FileServices();

export default fileServices;
