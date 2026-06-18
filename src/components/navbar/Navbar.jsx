import React, { memo, useEffect, useState } from 'react'
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom'

let Navbar = memo(() => {
    let navigate = useNavigate()
    let [user, setUser] = useState(null)

    useEffect(() => {
        let loggedInUser = JSON.parse(localStorage.getItem("user"))
        setUser(loggedInUser)
    }, [])

    function logoutUser() {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser(null)
        navigate("/")
    }

    return (
        <nav className="navbar navbar-expand-lg bg-white border-bottom py-1">
            <div className="container-fluid">
                <Link to={"/"} className="navbar-brand fw-bold fs-2 text-success">
                    <img src="/logo/apnidukaanlogo.png" alt="logo of apni dukaan" className='logo-img' />
                </Link>

                <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navMenu"><span className="navbar-toggler-icon"></span></button>

                <div className="collapse navbar-collapse" id="navMenu">
                    <ul className="navbar-nav mx-auto gap-lg-4 fw-semibold">
                        <li className="nav-item"><Link to={"shops"} className="nav-link">Shops</Link></li>
                    </ul>

                    <div className="d-flex gap-3 mt-3 mt-lg-0 align-items-center">
                        {user ?
                            <>
                                <span className="fw-semibold">Hello,<span className="text-primary ms-1 text-capitalize">{user.name}</span></span>
                                <button className="btn btn-outline-danger rounded-pill px-4" onClick={logoutUser}>Logout</button>
                            </>
                            :
                            <>
                                <Link to={"/login"} className="btn btn-outline-success rounded-pill px-4"> Log in </Link>
                            </>
                        }

                        <Link to={"/register"} className="btn btn-warning rounded-pill px-4 fw-semibold text-dark">Become a Partner</Link>
                        <Link to={"shops"} className="btn text-white rounded-pill px-4 fw-semibold" style={{ backgroundColor: "#ff6b35" }}>
                            Order Now
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
})

export default Navbar