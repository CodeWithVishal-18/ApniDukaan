import React, { memo, useEffect, useState } from 'react'
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

let Navbar = memo(() => {
    let navigate = useNavigate()
    let [user, setUser] = useState(null)
    let { cartCount, setCartCount } = useCart()

    useEffect(() => {
        let loggedInUser = JSON.parse(localStorage.getItem("user"))
        setUser(loggedInUser)
        async function getCartCount() {
            if (!loggedInUser || loggedInUser.role !== "ROLE_CUSTOMER") return
            try {
                let response = await fetch(`http://localhost:8080/api/v1/customer/cart/${loggedInUser.id}`)
                let responseObject = await response.json()

                let count = responseObject.data.items.reduce((sum, item) => sum + item.quantity,0);
                setCartCount(count)
            } catch (error) {
                console.log(error)
            }
        }
        getCartCount()
    }, [])

    function logoutUser() {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser(null)
        window.location.href = "/"
    }

    return (
        <nav className="navbar navbar-expand-lg bg-white border-bottom py-1">
            <div className="container-fluid">

                <Link to="/" className="navbar-brand">
                    <img src="/logo/apnidukaanlogo.png" alt="logo" className="logo-img" />
                </Link>

                <div className="d-flex align-items-center gap-2 ms-auto d-lg-none">
                    {user && (
                        <span className="fw-semibold text-primary small text-capitalize" style={{ maxWidth: "90px" }}>
                            {user.name.split(" ")[0]}
                        </span>
                    )}
                    <Link to="/cart" className="cart-icon-wrapper position-relative text-dark">
                        <i className="bi bi-cart3 fs-4"></i>
                        {cartCount > 0 && (<span className="cart-badge">{cartCount}</span>)}
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu"><span className="navbar-toggler-icon"></span></button>
                </div>
                <div className="collapse navbar-collapse" id="navMenu">
                    <div className="ms-auto d-flex flex-column flex-lg-row align-items-lg-center gap-3 mt-3 mt-lg-0">
                        {user ? (
                            <>
                                <span className="fw-semibold">Welcome,<span className="text-primary ms-1 text-capitalize">{user.name}</span></span>

                                <button className="btn btn-outline-danger rounded-pill px-4" onClick={logoutUser}>Logout</button>
                            </>
                        ) : (
                            <Link to="/login" className="btn btn-outline-success rounded-pill px-4">Login</Link>
                        )}

                        <Link to="/cart" className="cart-icon-wrapper position-relative text-dark d-none d-lg-block">
                            <i className="bi bi-cart3 fs-3"></i>
                            {cartCount > 0 && (<span className="cart-badge">{cartCount}</span>)}
                        </Link>

                        <Link to="/register" className="btn btn-warning rounded-pill px-4 fw-semibold text-dark">
                            Become a Partner
                        </Link>

                        <Link to="/shops" className="btn text-white rounded-pill px-4 fw-semibold" style={{ backgroundColor: "#ff6b35" }}>
                            Order Now
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
})

export default Navbar