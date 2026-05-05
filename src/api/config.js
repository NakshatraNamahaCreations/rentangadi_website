/**
 * API configuration - use env variable for different environments
 * In dev, use /api so Vite proxy forwards to api.rentangadi.in (avoids CORS)
 */
export const API_BASE =
  import.meta.env.VITE_API_BASE ??
  (import.meta.env.DEV ? '/api' : 'https://api.rentangadi.in/api')
export const UPLOADS_BASE = import.meta.env.VITE_UPLOADS_BASE || 'https://api.rentangadi.in/subcategory'
export const PRODUCT_IMAGE_BASE =
  import.meta.env.VITE_PRODUCT_IMAGE_BASE || "https://api.rentangadi.in/product"

// Resolve an image reference to a renderable src.
// New records store full Cloudinary URLs; legacy records store bare filenames.
const resolveImage = (src, base) => {
  if (!src) return ''
  return /^https?:\/\//i.test(src)
    ? src
    : `${base}/${encodeURIComponent(src)}`
}

export const resolveProductImage = (src) => resolveImage(src, PRODUCT_IMAGE_BASE)
export const resolveSubcategoryImage = (src) => resolveImage(src, UPLOADS_BASE)

/** Optional env fallback only. Enquiries send `clientId` from the logged-in user — see `getClientIdFromLoggedInUser`. */
export const DEFAULT_CLIENT_ID = import.meta.env.VITE_DEFAULT_CLIENT_ID || ''

/** Client portal — full enquiry history for the logged-in user */
export const CLIENT_PORTAL_URL =
  import.meta.env.VITE_CLIENT_PORTAL_URL || 'https://client.rentangadi.in/'