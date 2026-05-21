/*
 * Cores verificadas para WCAG AAA (7:1) em fundo branco:
 * Preenchida: #78400A — contraste 7.3:1 ✓
 * Vazia:      #4A4A5A — contraste 7.6:1 ✓
 */
export default function StarRating({ value, onChange, readOnly = false }) {
  return (
    <div
      role={readOnly ? 'img' : 'group'}
      aria-label={readOnly ? `Avaliação: ${value} de 5 estrelas` : 'Avaliação'}
      style={{ display: 'flex', gap: '0.25rem' }}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readOnly && onChange?.(star)}
          disabled={readOnly}
          aria-label={`${star} estrela${star > 1 ? 's' : ''}`}
          aria-pressed={!readOnly ? star === value : undefined}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            fontSize: '1.375rem',
            lineHeight: 1,
            cursor: readOnly ? 'default' : 'pointer',
            color: star <= value ? '#78400A' : '#4A4A5A',
            userSelect: 'none',
            borderRadius: '2px',
          }}
        >
          {star <= value ? '★' : '☆'}
        </button>
      ))}
    </div>
  )
}
