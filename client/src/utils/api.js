export async function authFetch(url, options = {}) {
  const token = (() => {
    try { return localStorage.getItem('token'); } catch(e) { return null; }
  })();

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(url, { ...options, headers });
  const data = await res.text();
  try { return { ok: res.ok, status: res.status, data: JSON.parse(data) }; } catch (e) { return { ok: res.ok, status: res.status, data }; }
}
