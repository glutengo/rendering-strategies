export function isBrowser() {
  try {
    return !!window
  } catch (e) {
    return false;
  }
}

export function getRequestLocation() {
  if (isBrowser()) {
    return document.location;
  } else {
    const host = process.request.get('Host').split(':');
    return {
      port: host[1],
      hostname: host[0],
      protocol: process.request.protocol + ':'
    };
  }
}
