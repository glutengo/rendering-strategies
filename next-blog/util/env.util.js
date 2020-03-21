export function getBaseURL() {
  return process.env.BACKEND_URL;
}

export function getLocation(context) {
  if (context && context.req) {
    const host = context.req.headers['host'].split(':');
    return {
      port: host[1] || '',
      hostname: host[0],
      protocol: 'http:'
    };
  } else {
    return process.browser && document.location;
  }
}
