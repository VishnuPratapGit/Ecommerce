class AuthService {
  constructor() {
    this.BASE_URL = import.meta.env.VITE_API_URL;
  }

  async signup(inputData) {
    try {
      const response = await fetch(`${this.BASE_URL}/api/v1/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error("Network error:", error);
      return false;
    }
  }

  async getCurrentUser() {
    try {
      let response = await fetch(`${this.BASE_URL}/api/v1/users/getuser`, {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 401) {
        console.warn("Access token expired, trying to refresh...");

        // Try to refresh tokens
        const refreshResponse = await fetch(
          `${this.BASE_URL}/api/v1/users/new-tokens`,
          {
            method: "POST",
            credentials: "include",
          }
        );

        if (!refreshResponse.ok) {
          console.error("Token refresh failed.");
          return null;
        }

        //retry with new token
        response = await fetch(`${this.BASE_URL}/api/v1/users/getuser`, {
          method: "GET",
          credentials: "include",
        });
      }

      const userData = await response.json();

      if (!response.ok) {
        console.log(userData.message);
        return null;
      }

      return userData;
    } catch (error) {
      console.log("Failed to fetch user data", error);
      return null;
    }
  }

  async login(inputData) {
    try {
      const response = await fetch(`${this.BASE_URL}/api/v1/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(inputData),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.log("Request not sent: ", error);
    }
  }

  async logout() {
    console.log("reached");
    fetch(`${this.BASE_URL}/api/v1/users/logout`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((err) => console.log("Error in Logout", err));
  }
}

const authService = new AuthService();

export default authService;
