import React, { useState } from 'react'
import "./login.css"
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import LeftUI from './LeftUI'

export default function Login() {
    let [showPassword, setShowPassword] = useState(false)
    let [loginData, setLoginData] = useState({ email: "", password: "" })

    function handleChange(event) {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value
        })
    }

    async function loginUser(event) {
        event.preventDefault()
        try {
            let response = await fetch("http://localhost:8080/api/v1/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(loginData)
                }
            )

            if (!response.ok) {
                toast.warning("Please Enter Correct Email id and Password!")
                return
            }

            let data = await response.json()
            localStorage.setItem("token", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))

            if (data.user.role === "ROLE_VENDOR") {
                window.location.href =
                    `http://localhost:3001/vendor?token=${data.token}
                    &id=${data.user.id}
                    &name=${data.user.name}
                    &role=${data.user.role}`
            } else {
                window.location.href = "/"
            }
        }
        catch (error) {
            toast.warning("Please Enter Correct Email id and Password!")
        }
    }

    return (
        <div className="container-fluid login-wrapper">
            <div className="row login-card shadow rounded-4 overflow-hidden">
                <LeftUI />

                <div className="col-lg-7 bg-light login-right">
                    <div className="d-lg-none text-center mb-4">
                        <div className="logo-circle mx-auto mb-3"><i className="bi bi-shop"></i></div>

                        <h2 className="fw-bold"> Apni <span className="text-orange">Dukaan </span> </h2>
                    </div>

                    <div className="login-tabs mb-4">
                        <Link to="/login" className="w-50">
                            <button className="login-tab-btn login-active-tab">Login</button>
                        </Link>

                        <Link to="/register" className="w-50">
                            <button className="login-tab-btn">Create Account</button>
                        </Link>
                    </div>

                    <h2 className="login-heading">Welcome back 👋</h2>

                    <p className="text-muted mb-4">
                        New to ApniDukaan?
                        <Link to="/register" className="orange-link"> {" "}Open your store free →</Link>
                    </p>

                    <form onSubmit={loginUser}>

                        <div className="mb-3">
                            <label className="fw-semibold mb-2">Email address</label>

                            <div className="input-group login-input">
                                <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={loginData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div className="mb-2">
                            <label className="fw-semibold mb-2">Password</label>
                            <div className="input-group login-input">
                                <span className="input-group-text"><i className="bi bi-lock"></i></span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleChange}
                                    placeholder="Enter password"
                                />

                                <span className="input-group-text cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                    <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                                </span>
                            </div>
                        </div>
                        <button className="btn login-btn w-100 mt-4">Login to My Dukaan</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
