import axios from axios;

class User {
  static async createUser(formData) {
    try {
      console.log("data:", formData);
      const response = await axios.post("http://localhost:3001/user/register", formData);
      console.log("User registered successfully:", response.data);
      return response.data; 
    } catch (err) {
      console.error("Error creating a new user:", err);
      throw err;
    }
  }
static async viewUsers() {
    try {
        const response = await axios.get("http://localhost:3001/user/viewUsers");
        return response.data; 
    } catch (err) {
        console.error("Error fetching the users:", err);
        throw err;
    }
}
}