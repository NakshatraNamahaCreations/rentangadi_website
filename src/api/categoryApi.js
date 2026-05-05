import { API_BASE } from './config'

let _subCatCache = null
let _subCatCacheTime = 0
const CACHE_TTL = 60_000

export async function getSubCategories() {
  const now = Date.now()
  if (_subCatCache && now - _subCatCacheTime < CACHE_TTL) {
    return _subCatCache
  }

  const res = await fetch(`${API_BASE}/subcategory/getappsubcat`)
  if (!res.ok) {
    throw new Error(`Failed to fetch subcategories: ${res.status} ${res.statusText}`)
  }
  const data = await res.json()
  const result = data.subcategory || []
  _subCatCache = result
  _subCatCacheTime = now
  return result
}
