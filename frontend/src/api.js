// Em dev usa o proxy do Vite (/api → localhost:8001)
// Em produção usa a URL completa do Railway via VITE_API_URL
const BASE_URL = import.meta.env.VITE_API_URL || '/api'

export async function fetchPlaces() {
  const res = await fetch(`${BASE_URL}/places/`)
  if (!res.ok) throw new Error('Erro ao buscar lugares')
  return res.json()
}

export async function createPlace(data) {
  const res = await fetch(`${BASE_URL}/places/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    console.error('Erro ao salvar:', res.status, body)
    throw new Error('Erro ao salvar lugar')
  }
  return res.json()
}

export async function deletePlace(id) {
  const res = await fetch(`${BASE_URL}/places/${id}/`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Erro ao deletar lugar')
}
