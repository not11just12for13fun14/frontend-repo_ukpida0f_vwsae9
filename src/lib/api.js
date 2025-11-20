export const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

export async function apiGet(path, params) {
  const url = new URL(API_BASE + path, window.location.origin);
  if (params) Object.entries(params).forEach(([k, v]) => v !== undefined && url.searchParams.append(k, v));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function apiPost(path, data) {
  const res = await fetch((API_BASE + path), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data || {})
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
