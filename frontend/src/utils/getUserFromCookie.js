// utils/getUserFromCookie.js
export function getUserFromCookie() {
    const cookies = document.cookie.split(";").map(c => c.trim());
    const userCookie = cookies.find(c => c.startsWith("user="));
    if (!userCookie) return null;
  
    try {
      return JSON.parse(decodeURIComponent(userCookie.split("=")[1]));
    } catch (e) {
      console.error("Failed to parse user cookie:", e);
      return null;
    }
}
  