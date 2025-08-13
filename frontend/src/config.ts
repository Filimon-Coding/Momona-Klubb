// src/config.ts
export const API_URL   = process.env.REACT_APP_API_URL ?? 'http://localhost:5272/api';
export const ASSETS_ORIGIN = API_URL.replace(/\/api\/?$/, ''); // -> http://localhost:5272

export const imgUrl = (path?: string) =>
  path && path.startsWith('/') ? `${ASSETS_ORIGIN}${path}` : (path ?? '');
