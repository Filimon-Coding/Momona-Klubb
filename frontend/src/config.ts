// src/config.ts

// Default to Render in production, localhost in dev.
// You can still override with REACT_APP_API_URL at build time (Netlify).
const DEFAULT_API =
  process.env.NODE_ENV === 'production'
    ? 'https://momona-klubb.onrender.com/api'
    : 'http://localhost:5272/api';

export const API_URL = (process.env.REACT_APP_API_URL || DEFAULT_API)
  .replace(/\/+$/, ''); // strip trailing slash

// The backend origin (used for serving static files like /images/*).
export const ASSETS_ORIGIN = API_URL.replace(/\/api$/i, '');

// Build API endpoints safely
export const api = (path = '') =>
  `${API_URL}${path.startsWith('/') ? '' : '/'}${path}`;

// Resolve image paths coming from the API/DB.
// - leaves absolute http(s), data:, blob: untouched
// - for relative paths like "/images/foo.jpg" -> "<ASSETS_ORIGIN>/images/foo.jpg"
// - for "images/foo.jpg" -> "<ASSETS_ORIGIN>/images/foo.jpg"
export function imgUrl(path?: string): string {
  if (!path) return '';
  if (/^(?:https?:)?\/\//i.test(path) || /^(data:|blob:)/i.test(path)) return path;
  const clean = `/${path}`.replace(/\/{2,}/g, '/'); // ensure single leading slash
  return `${ASSETS_ORIGIN}${clean}`;
}
