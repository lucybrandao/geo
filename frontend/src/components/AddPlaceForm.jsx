import { useState } from 'react'
import StarRating from './StarRating'

export default function AddPlaceForm({ coords, onSave, onCancel }) {
  const [name, setName] = useState('')
  const [note, setNote] = useState('')
  const [rating, setRating] = useState(3)
  const [visitedAt, setVisitedAt] = useState('')
  const [noDate, setNoDate] = useState(true)
  const [saving, setSaving] = useState(false)

  function handleNoDateChange(e) {
    setNoDate(e.target.checked)
    if (e.target.checked) setVisitedAt('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    setSaving(true)
    await onSave({ name, note, rating, visited_at: noDate ? null : visitedAt || null, ...coords })
    setSaving(false)
  }

  return (
    <div className="form-overlay" role="dialog" aria-modal="true" aria-labelledby="form-title">
      <form className="place-form" onSubmit={handleSubmit}>
        <h3 id="form-title">Novo lugar</h3>
        <p className="coords-hint" aria-label="Coordenadas do ponto selecionado">
          {coords.latitude.toFixed(4)}, {coords.longitude.toFixed(4)}
        </p>

        <label htmlFor="place-name">Nome</label>
        <input
          id="place-name"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Chapada dos Veadeiros"
          required
          aria-required="true"
        />

        <label htmlFor="place-date">Data da visita</label>
        <input
          id="place-date"
          type="date"
          value={visitedAt}
          onChange={(e) => setVisitedAt(e.target.value)}
          disabled={noDate}
          aria-disabled={noDate}
        />
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={noDate}
            onChange={handleNoDateChange}
            aria-controls="place-date"
          />
          Não lembro a data
        </label>

        <label>Avaliação</label>
        <StarRating value={rating} onChange={setRating} />

        <label htmlFor="place-note">Observações (opcional)</label>
        <textarea
          id="place-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Como foi? O que não pode deixar de fazer..."
          rows={3}
        />

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? 'Salvando…' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  )
}
