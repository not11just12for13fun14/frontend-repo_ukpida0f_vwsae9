export function cn(...args) {
  return args
    .flatMap(a => typeof a === 'string' ? a.split(' ') : (a && typeof a === 'object' ? Object.entries(a).filter(([,v])=>!!v).map(([k])=>k) : []))
    .filter(Boolean)
    .join(' ')
}
