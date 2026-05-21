import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import StarRating from './StarRating'

// Fix default marker icons broken by Webpack/Vite bundling
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function ratingColor(rating) {
  const colors = { 1: '#ef4444', 2: '#f97316', 3: '#eab308', 4: '#84cc16', 5: '#22c55e' }
  return colors[rating] || '#6b7280'
}

function coloredIcon(rating) {
  return L.divIcon({
    className: '',
    html: `<div style="
      width:28px;height:28px;border-radius:50% 50% 50% 0;
      background:${ratingColor(rating)};border:2px solid #fff;
      box-shadow:0 2px 6px rgba(0,0,0,.4);
      transform:rotate(-45deg);
    "></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -30],
  })
}

function ClickHandler({ onClick }) {
  useMapEvents({ click: (e) => onClick(e.latlng) })
  return null
}

export default function MapView({ places, onMapClick, focusedPlace, onDelete }) {
  return (
    <MapContainer
      center={[-14.235, -51.925]}
      zoom={4}
      style={{ flex: 1, height: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ClickHandler onClick={onMapClick} />

      {places.map((place) => (
        <Marker
          key={place.id}
          position={[parseFloat(place.latitude), parseFloat(place.longitude)]}
          icon={coloredIcon(place.rating)}
        >
          <Popup>
            <strong>{place.name}</strong>
            <br />
            <StarRating value={place.rating} readOnly />
            {place.visited_at && (
              <span style={{ fontSize: 12, color: '#6b7280', display: 'block', marginTop: 4 }}>
                {new Date(place.visited_at + 'T00:00:00').toLocaleDateString('pt-BR')}
              </span>
            )}
            {place.note && <p style={{ margin: '6px 0 0', fontSize: 13 }}>{place.note}</p>}
            <button
              onClick={() => onDelete(place.id)}
              style={{ marginTop: 8, color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: 13 }}
            >
              Remover
            </button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
