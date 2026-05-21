import { useState, useEffect } from 'react'
import MapView from './components/MapView'
import Sidebar from './components/Sidebar'
import AddPlaceForm from './components/AddPlaceForm'
import { fetchPlaces, createPlace, deletePlace } from './api'
import './App.css'

export default function App() {
  const [places, setPlaces] = useState([])
  const [pendingCoords, setPendingCoords] = useState(null)
  const [focusedPlace, setFocusedPlace] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPlaces()
      .then(setPlaces)
      .catch(() => setError('Não foi possível carregar os lugares. Verifique se o backend está rodando.'))
  }, [])

  function handleMapClick(latlng) {
    setPendingCoords({
      latitude: parseFloat(latlng.lat.toFixed(6)),
      longitude: parseFloat(latlng.lng.toFixed(6)),
    })
  }

  async function handleSave(data) {
    try {
      const created = await createPlace(data)
      setPlaces((prev) => [created, ...prev])
      setPendingCoords(null)
    } catch {
      setError('Erro ao salvar. Tente novamente.')
    }
  }

  async function handleDelete(id) {
    try {
      await deletePlace(id)
      setPlaces((prev) => prev.filter((p) => p.id !== id))
    } catch {
      setError('Erro ao remover. Tente novamente.')
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Meu diário de viagens</h1>
        <span className="app-subtitle" aria-hidden="true">Clique no mapa para marcar um lugar visitado</span>
      </header>

      {error && (
        <div className="error-banner" role="alert">
          {error}
          <button onClick={() => setError(null)} aria-label="Fechar mensagem de erro">×</button>
        </div>
      )}

      <div className="app-body">
        <Sidebar places={places} onDelete={handleDelete} onFocus={setFocusedPlace} />
        <MapView
          places={places}
          onMapClick={handleMapClick}
          focusedPlace={focusedPlace}
          onDelete={handleDelete}
        />
      </div>

      {pendingCoords && (
        <AddPlaceForm
          coords={pendingCoords}
          onSave={handleSave}
          onCancel={() => setPendingCoords(null)}
        />
      )}
    </div>
  )
}
