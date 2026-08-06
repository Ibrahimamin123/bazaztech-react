import { API_BASE_URL } from "../config/api";

const getApiOrigin = () => {
  if (typeof window === "undefined") return "";

  // Absolute API URL (local: http://localhost:5000/api) → use that host for uploads.
  // Relative "/api" (production same-origin) → use the page origin.
  if (/^https?:\/\//i.test(API_BASE_URL)) {
    try {
      return new URL(API_BASE_URL).origin;
    } catch {
      return window.location.origin;
    }
  }

  return window.location.origin;
};

// Resolves stored image URLs so they load from the same host that serves
// the API/uploads, whether that's localhost:5000 in dev or the public site.
export const resolveImageSrc = (src) => {
  if (!src) return src;

  const uploadsMatch = String(src).match(/\/(?:api\/)?uploads\/([^?#]+)/i);
  if (uploadsMatch) {
    const origin = getApiOrigin();
    let filename = uploadsMatch[1];
    try {
      filename = encodeURI(decodeURIComponent(filename));
    } catch {
      filename = encodeURI(filename);
    }
    if (!origin) return `/api/uploads/${filename}`;
    return `${origin}/api/uploads/${filename}`;
  }

  if (typeof window === "undefined") return src;

  let resolved = src;

  // Non-upload relative paths (e.g. Vite bundled assets) must stay on the
  // frontend origin — only /api/uploads belong on the API host.
  if (resolved.startsWith("/")) {
    resolved = `${window.location.origin}${resolved}`;
  }

  if (window.location.protocol === "https:" && resolved.startsWith("http://")) {
    try {
      const url = new URL(resolved);
      if (url.hostname === window.location.hostname) {
        resolved = resolved.replace(/^http:\/\//, "https://");
      }
    } catch {
      resolved = resolved.replace(/^http:\/\//, "https://");
    }
  }

  return resolved;
};
