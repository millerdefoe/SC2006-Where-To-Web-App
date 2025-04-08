export const isValidIdentifier = (identifier) => {
    const phoneRegex = /^\d{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return phoneRegex.test(identifier) || emailRegex.test(identifier);
  };
  
  export const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };
  
  export const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  };
  
  export const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };
  
  export const getUserFromCookie = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user="));
  
    if (!cookieString) return null;
  
    try {
      const encodedValue = cookieString.split("=")[1];
      const decodedValue = decodeURIComponent(encodedValue); 
      const user = JSON.parse(decodedValue); 
      return user;
    } catch (err) {
      console.error("Error parsing user cookie:", err);
      return null;
    }
  };

  export const saveUserToCookie = (user, days = 7) => {
    const maxAge = days * 24 * 60 * 60; // convert days to seconds
    document.cookie = `user=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=${maxAge}`;
  };
  