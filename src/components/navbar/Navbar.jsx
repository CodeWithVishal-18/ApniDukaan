import React, { memo } from 'react'
import './navbar.css'
import { Link } from 'react-router-dom';
let Navbar = memo(() => {
    return (
        <nav className="navbar navbar-expand-lg bg-white border-bottom py-1">
            <div className="container-fluid">
                <a href="/" className="navbar-brand fw-bold fs-2 text-success">
                    <img src="/logo/apnidukaanlogo.png" alt="logo of apni dukaan with orange and green color" className='logo-img' />
                </a>
                <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navMenu" > <span className="navbar-toggler-icon"></span> </button>

                <div className="collapse navbar-collapse" id="navMenu">

                    <ul className="navbar-nav mx-auto gap-lg-4 fw-semibold">
                        <li className="nav-item">
                            <a href="#works" className="nav-link">How It Works</a>
                        </li>

                        <li className="nav-item">
                            <Link to={"vendor"} className="nav-link">Become a Partner</Link>
                        </li>
                    </ul>

                    <div className="d-flex gap-3 mt-3 mt-lg-0">
                        <button className="btn btn-outline-success rounded-pill px-4">
                            Log in
                        </button>

                        <button className="btn text-white rounded-pill px-4 fw-semibold" style={{ backgroundColor: "#ff6b35" }}>
                            Order Now
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    )
})

export default Navbar;