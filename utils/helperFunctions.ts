export function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode payload
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return currentTime >= payload.exp;
  } catch (e) {
    console.error('Invalid token:', e);
    return true;
  }
}