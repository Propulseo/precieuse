/**
 * Logo affiché en haut à gauche du Studio (remplace « Default »).
 * Simple mot-symbole « Précieuse » aux couleurs de la marque.
 */
export function StudioLogo() {
  return (
    <span
      style={{
        fontFamily: 'Spectral, Georgia, serif',
        fontStyle: 'italic',
        fontWeight: 600,
        fontSize: 20,
        letterSpacing: '0.01em',
        color: '#125e5e',
      }}
    >
      Précieuse
    </span>
  )
}
