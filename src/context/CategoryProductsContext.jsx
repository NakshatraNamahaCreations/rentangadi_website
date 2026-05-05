import { createContext, useContext, useState, useEffect } from 'react'

const CategoryProductsContext = createContext(null)

export function CategoryProductsProvider({ children }) {
  const [view, setView] = useState(null)

  const openProductsPage = (categoryId, categoryName, subKey, subLabel) => {
    setView({ categoryId, categoryName, subKey, subLabel })
  }

  const closeProductsPage = () => {
    setView(null)
  }

  // Clear view when navigating via header/footer
  useEffect(() => {
    const onNav = () => setView(null)
    window.addEventListener('nav-change', onNav)
    return () => window.removeEventListener('nav-change', onNav)
  }, [])

  return (
    <CategoryProductsContext.Provider
      value={{
        view,
        openProductsPage,
        closeProductsPage,
      }}
    >
      {children}
    </CategoryProductsContext.Provider>
  )
}

export function useCategoryProducts() {
  const ctx = useContext(CategoryProductsContext)
  if (!ctx) throw new Error('useCategoryProducts must be used within CategoryProductsProvider')
  return ctx
}
