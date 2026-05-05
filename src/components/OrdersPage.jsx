import { useEffect, useMemo } from 'react'
import { useCart } from '../hooks/useCart'
import { useMergedEnquiries } from '../hooks/useMergedEnquiries'

import OrderCard from './OrderCard'
import './OrdersPage.css'

export default function OrdersPage() {
  const { setShowOrdersPage } = useCart()
  const { displayOrders, loading } = useMergedEnquiries()

  const allEnquiries = useMemo(() => {
    const getTime = (o) =>
      new Date(o.createdAt || o.updatedAt || o.date || o.enquiryDate || 0).getTime() || 0

    return [...displayOrders].sort((a, b) => getTime(b) - getTime(a))
  }, [displayOrders])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="orders-page">
      <div className="orders-page-header">
        <h1 className="orders-page-title">My Enquiries</h1>
        <button
          type="button"
          className="cart-back-btn orders-back-btn"
          onClick={() => setShowOrdersPage(false)}
        >
          Back
        </button>
      </div>

      <div className="orders-page-content">
        {loading ? (
          <p>Loading enquiries...</p>
        ) : allEnquiries.length === 0 ? (
          <div className="orders-empty">
            <p>You have not made any enquiries yet.</p>
            <button
              type="button"
              className="orders-shop-btn"
              onClick={() => setShowOrdersPage(false)}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {allEnquiries.map((order, index) => {
              const orderId = order._id || order.id || index
              return (
                <OrderCard
                  key={orderId}
                  order={order}
                  index={index}
                  showOrderDetailsPortal
                />
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
