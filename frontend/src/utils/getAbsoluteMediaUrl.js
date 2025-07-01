export function getAbsoluteMediaUrl(url) {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `http://127.0.0.1:8000${url}`;
}