import React, { useEffect, useState } from 'react'
import "./cart.css"
import { toast } from 'react-toastify'

export default function Cart() {
    let [cartData, setCartData] = useState({ grandTotal: 0, items: [] })
    let [loading, setLoading] = useState(true)
    let [cartItems, setCartItems]=useState()

    useEffect(() => {
        async function getCart() {
            try {
                let user = JSON.parse(localStorage.getItem("user"))
                let response = await fetch(`http://localhost:8080/api/v1/customer/cart/${user.id}`)
                let responseObject = await response.json()

                setCartData(responseObject.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        getCart()
    }, [])

    if (loading) {
        return (
            <div className="container py-5 text-center"><h4>Loading Cart...</h4></div>
        )
    }
    if (cartData.items.length === 0) {
        return (
            <div className="container py-5 text-center"><h2>Your Cart Is Empty 🛒</h2></div>
        )
    }
    return (
        <section className="container py-4">
            <h2 className="fw-bold mb-4">My Cart ({cartData.items.length} Items)</h2>
            <div className="row">

                <div className="col-lg-8">
                    {cartData.items.map((item) => (
                        <div className="cart-card" key={item.cartId}>

                            <img src={`http://localhost:8080/productimages/${item.product.imageName}`} alt="product" className="cart-img" />

                            <div className="flex-grow-1">
                                <h5 className="fw-bold">{item.product.productName}</h5>

                                <p className="text-muted mb-1">{item.product.shop.name}</p>

                                <small className="text-secondary">{item.product.weight} {item.product.unit}</small>

                                <div className="mt-2">
                                    <span className="fw-bold text-success fs-5">₹{item.product.finalPrice.toFixed(2)}</span>
                                    <span className="ms-2 text-decoration-line-through text-muted">₹{item.product.price}</span>
                                </div>

                                <div className="mt-2">
                                    <span className="badge bg-success">Qty : {item.quantity}</span>
                                </div>
                            </div>
                            <div className="text-end">
                                <h5 className="fw-bold">₹{item.totalPrice.toFixed(2)}</h5>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="col-lg-4">
                    <div className="summary-card">
                        <h4 className="fw-bold mb-4">Bill Details</h4>
                        <div className="d-flex justify-content-between mb-3">
                            <span>Item Total</span>
                            <span>₹{cartData.grandTotal.toFixed(2)}</span>
                        </div>

                        <div className="d-flex justify-content-between mb-3">
                            <span>Delivery Fee</span>
                            <span className='text-decoration-line-through text-muted'>₹20</span>
                            <span>₹0</span>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                            <span>Platform Fee</span>
                            <span className='text-decoration-line-through text-muted'>₹5</span>
                            <span>₹0</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between fw-bold fs-5">
                            <span>Grand Total</span>
                            <span>₹{cartData.grandTotal.toFixed(2)}</span>
                        </div>

                        <button className="btn btn-success w-100 mt-4 py-3 fw-bold">Proceed To Checkout</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
