import StarRating from './StarRating'

export default function Sidebar({ places, onDelete, onFocus }) {
  return (
    <aside className="sidebar" aria-label="Lista de lugares visitados">
      <h2>Meus lugares</h2>
      <p className="sidebar-count" aria-live="polite">
        {places.length} lugar{places.length !== 1 ? 'es' : ''} visitado{places.length !== 1 ? 's' : ''}
      </p>

      {places.length === 0 && (
        <p className="sidebar-empty">Clique no mapa para marcar um lugar que você visitou.</p>
      )}

      <ul className="place-list" aria-label="Lugares visitados">
        {places.map((place) => (
          <li
            key={place.id}
            className="place-item"
            onClick={() => onFocus(place)}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onFocus(place)}
            aria-label={`${place.name}, ${place.rating} estrela${place.rating !== 1 ? 's' : ''}`}
          >
            <div className="place-header">
              <span className="place-name">{place.name}</span>
              <button
                className="btn-delete"
                onClick={(e) => { e.stopPropagation(); onDelete(place.id) }}
                aria-label={`Remover ${place.name}`}
              >
                ×
              </button>
            </div>
            <StarRating value={place.rating} readOnly />
            {place.visited_at && (
              <span className="place-date">
                {new Date(place.visited_at + 'T00:00:00').toLocaleDateString('pt-BR')}
              </span>
            )}
            {place.note && <p className="place-note">{place.note}</p>}
          </li>
        ))}
      </ul>
    </aside>
  )
}
