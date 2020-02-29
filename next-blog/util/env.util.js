export function getBaseURL(context) {
  const location = getLocation(context);
  return `${location.protocol}//${location.hostname}:8082`;
}

export function getLocation(context) {
  if (context && context.req) {
    const host = context.req.headers['host'].split(':');
    return {
      port: parseInt(host[1]),
      hostname: host[0],
      protocol: 'http:'
    };
  } else {
    return process.browser && document.location;
  }
}
