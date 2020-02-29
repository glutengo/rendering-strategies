export function withCache(props) {
  if (process.browser) {
    window.NEXT_HTTP_CACHE = {
      ...window.NEXT_HTTP_CACHE,
      ...props
    };
  }
  return props;
}

export async function useCache(url, propertyName) {
  let data;
  if (process.browser && window.NEXT_HTTP_CACHE) {
    data = window.NEXT_HTTP_CACHE[propertyName];
  }
  if (!data) {
    data = await (await fetch(url)).json();
  }
  return data;
}
