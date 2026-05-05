/**
 * Client ID from API user object (after login). Tries common field names.
 */
export function getClientIdFromUser(user) {
  if (!user || typeof user !== 'object') return ''
  // Check explicit clientId fields first
  const v =
    user.clientId ?? user.ClientId ?? user.client_id ?? user.clientID
  if (v !== undefined && v !== null && String(v).trim()) return String(v).trim()
  // For client-role users, their own _id IS the clientId
  const role = (user.role || user.Role || '').toLowerCase()
  if (role === 'client' || role === 'user') {
    const id = user._id || user.id || ''
    if (id) return String(id).trim()
  }
  // Fallback: if no explicit clientId and no role, use _id
  const fallbackId = user._id || user.id || ''
  return fallbackId ? String(fallbackId).trim() : ''
}

export function getClientIdFromLoggedInUser() {
  try {
    const raw = localStorage.getItem('user')
    if (!raw) return ''
    return getClientIdFromUser(JSON.parse(raw))
  } catch {
    return ''
  }
}
