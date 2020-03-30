export function isBrowser() {
  try {
    return !!window
  } catch (e) {
    return false;
  }
}
