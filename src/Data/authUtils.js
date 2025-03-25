export const getUserFromCookies = () => {
  try {
    const cookies = document.cookie.split(';');
    const userCookie = cookies.find(cookie => cookie.trim().startsWith('user='));
    if (userCookie) {
      const userStr = userCookie.split('=')[1];
      if (!userStr || userStr === 'undefined' || userStr === 'null') {
        return null;
      }
      return JSON.parse(decodeURIComponent(userStr));
    }
    return null;
  } catch (error) {
    console.error('Error reading cookies:', error);
    return null;
  }
};

export const setUserInCookies = (userData) => {
  try {
    if (!userData) return;
    const userStr = encodeURIComponent(JSON.stringify(userData));
    document.cookie = `user=${userStr}; path=/; max-age=2592000`; // 30 days
  } catch (error) {
    console.error('Error setting cookies:', error);
  }
};

export const removeUserFromCookies = () => {
  try {
    document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Error removing cookies:', error);
  }
};
