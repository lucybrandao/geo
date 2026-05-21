const BASE_URL = import.meta.env.VITE_API_URL || '/api'

function authHeaders() {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Token ${token}` } : {}),
  }
}

export async function fetchPlaces() {
  const res = await fetch(`${BASE_URL}/places/`, { headers: authHeaders() })
  if (res.status === 401) { localStorage.removeItem('token'); window.location.reload() }
  if (!res.ok) throw new Error('Erro ao buscar lugares')
  return res.json()
}

export async function createPlace(data) {
  const res = await fetch(`${BASE_URL}/places/`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  })
  if (res.status === 401) { localStorage.removeItem('token'); window.location.reload() }
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    console.error('Erro ao salvar:', res.status, body)
    throw new Error('Erro ao salvar lugar')
  }
  return res.json()
}

export async function deletePlace(id) {
  const res = await fetch(`${BASE_URL}/places/${id}/`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  if (res.status === 401) { localStorage.removeItem('token'); window.location.reload() }
  if (!res.ok) throw new Error('Erro ao deletar lugar')
}
