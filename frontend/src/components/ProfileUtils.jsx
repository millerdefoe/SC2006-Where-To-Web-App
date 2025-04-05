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
    const cookie = document.cookie.split('; ').find((row) => row.startsWith('user='));
    return cookie ? JSON.parse(decodeURIComponent(cookie.split('=')[1])) : null;
  };

  export const saveUserToCookie = (user) => {
    document.cookie = `user=${JSON.stringify(user)}; path=/; max-age=86400`;
  };
  