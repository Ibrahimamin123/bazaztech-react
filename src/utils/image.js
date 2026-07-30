// If the page loaded over https but an image URL is stored as plain http
// (e.g. saved before the backend's HTTPS/proxy setup was finalized),
// browsers silently block it as mixed content and it just never appears.
// Upgrading the scheme here is a safe, harmless no-op when it isn't needed.
export const resolveImageSrc = (src) => {
  if (!src) return src;
  if (typeof window !== "undefined" && window.location.protocol === "https:" && src.startsWith("http://")) {
    return src.replace(/^http:\/\//, "https://");
  }
  return src;
};
