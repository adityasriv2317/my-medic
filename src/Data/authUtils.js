import Cookies from "js-cookie";

// Save user data in cookies
export const setUserInCookies = (user) => {
  Cookies.set("user", JSON.stringify(user), { expires: 7 }); // Expires in 7 days
};

// Get user data from cookies
export const getUserFromCookies = () => {
  const userData = Cookies.get("user");
  return userData ? JSON.parse(userData) : null;
};

// Remove user data from cookies (Logout)
export const removeUserFromCookies = () => {
  Cookies.remove("user");
};
