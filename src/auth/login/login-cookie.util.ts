/** Duración de la cookie del refresh (ms). JWT_REFRESH_COOKIE_MAX_MS o JWT_REFRESH_EXPIRES_SEC (segundos). */
export function refreshCookieMaxAgeMs(): number {
  const fromEnv = process.env.JWT_REFRESH_COOKIE_MAX_MS?.trim();
  if (fromEnv) {
    const n = parseInt(fromEnv, 10);
    if (!Number.isNaN(n) && n > 0) {
      return n;
    }
  }
  const sec = parseInt(
    process.env.JWT_REFRESH_EXPIRES_SEC ?? String(7 * 24 * 60 * 60),
    10,
  );
  return sec * 1000;
}

export function refreshCookieName(): string {
  return process.env.JWT_REFRESH_COOKIE_NAME?.trim() || 'refresh_token';
}

export function refreshJwtSecret(): string {
  return (
    process.env.JWT_REFRESH_SECRET?.trim() || 'dev-refresh-secret-change-me'
  );
}
