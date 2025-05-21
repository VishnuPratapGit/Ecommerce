class UserService {
  constructor() {
    this.BASE_URL = import.meta.env.VITE_API_URL;
  }

  async sellerRegistration(sellerData) {
    try {
      const response = await fetch(
        `${this.BASE_URL}/api/v1/users/become-seller`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sellerData),
        }
      );

      const userData = await response.json();

      if (!response.ok) {
        alert(userData.message || "Something went wrong");
        return false;
      }

      return userData.user;
    } catch (error) {
      console.log("Request not sent: ", error);
      alert("Network error");
      return false;
    }
  }
}

const userService = new UserService();

export default userService;
