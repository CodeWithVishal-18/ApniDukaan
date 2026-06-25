import React, { useState } from 'react'
import "./register.css"
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import LeftUI from './LeftUI'

export default function Register() {
    let navigate = useNavigate()
    let [role, setRole] = useState("ROLE_CUSTOMER")
    let [showPassword, setShowPassword] = useState(false)
    let { register, handleSubmit, watch, formState: { errors }, setError } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            phoneNumber: "",
            role: "ROLE_CUSTOMER"
        }
    })

    async function registerUser(data) {
        let firstName = data.name.split(" ")[0].toLowerCase()
        let randomNumber = Math.floor(100 + Math.random() * 900)
        let generatedId = `${firstName}${randomNumber}`

        let finalData = {
            ...data,
            id: generatedId,
            role: role
        }
        try {
            let response = await fetch("http://localhost:8080/api/v1/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(finalData)
                }
            )

            if (!response.ok) {
                let errorData = await response.json()
                if (errorData.message === "Email Already Exists!") {
                    setError("email", { type: "manual", message: "This email is already registered" })
                } else {
                    toast.error("Registration Failed")
                }
                return
            }
            toast.success("Registration Successful")
            navigate("/login")
        } catch (error) {
            toast.error("Something went wrong")
        }
    }
    let password = watch("password");

    return (
        <div className="container-fluid register-wrapper">
            <div className="row register-card shadow rounded-4 overflow-hidden">

                <LeftUI />

                <div className="col-lg-7 bg-light register-right">
                    <div className="register-tabs mb-2">
                        <Link to="/login" className="w-50"><button className="register-tab-btn">Login</button></Link>

                        <Link to="/register" className="w-50">
                            <button className="register-tab-btn register-active-tab">Create Account</button>
                        </Link>
                    </div>

                    <h2 className="register-heading">Join ApniDukaan ✨</h2>
                    <p className="text-muted mb-3">
                        Already have an account?<Link to="/login" className="orange-link">{" "}Login here →</Link>
                    </p>
                    <div className="row g-3 mb-1">
                        <div className="col-6">
                            <div className={role === "ROLE_VENDOR" ? "register-role-card register-active-role" : "register-role-card"}
                                onClick={() => setRole("ROLE_VENDOR")}>
                                <i className="bi bi-shop register-role-icon"></i>
                                <h6 className="fw-bold">Vendor</h6>
                            </div>
                        </div>

                        <div className="col-6">
                            <div className={role === "ROLE_CUSTOMER" ? "register-role-card register-active-role" : "register-role-card"}
                                onClick={() => setRole("ROLE_CUSTOMER")}>
                                <i className="bi bi-cart register-role-icon"></i>
                                <h6 className="fw-bold">Customer</h6>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(registerUser)}>
                        <div className="mb-2">
                            <label className="fw-semibold mb-1">Name</label>

                            <div className="input-group register-input">
                                <span className="input-group-text"><i className="bi bi-person"></i></span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter name"
                                    {...register("name", {
                                        required: "Name is required", pattern: {
                                            value: /^[A-Za-z\s]+$/,
                                            message: "Only Alphabets are Allowed"
                                        }
                                    })}
                                />
                            </div>
                            <div className="error-space">{errors.name?.message}</div>
                        </div>

                        <div className="mb-2">
                            <label className="fw-semibold mb-1">Phone Number</label>

                            <div className="input-group register-input">
                                <span className="input-group-text"><i className="bi bi-telephone"></i></span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="+91 9876543210"
                                    {...register("phoneNumber", { required: "Phone number is required" })}
                                />
                            </div>
                            <div className="error-space">{errors.phoneNumber?.message}</div>
                        </div>

                        <div className="mb-2">
                            <label className="fw-semibold mb-1">Email</label>
                            <div className="input-group register-input">
                                <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                    {...register("email", { required: "Email is required" })}
                                />
                            </div>
                            <div className="error-space">{errors.email?.message}</div>
                        </div>

                        <div className="mb-2">
                            <label className="fw-semibold mb-1">Password</label>
                            <div className="input-group register-input">
                                <span className="input-group-text"><i className="bi bi-lock"></i></span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder="Enter password"
                                    {...register("password", { required: "Password is required" })}
                                />

                                <span className="input-group-text cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                    <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                                </span>
                            </div>
                            <div className="error-space">{errors.password?.message}</div>
                        </div>

                        <div className="mb-2">

                            <label className="fw-semibold mb-1">
                                Confirm Password
                            </label>

                            <div className="input-group register-input">
                                <span className="input-group-text"><i className="bi bi-shield-lock"></i></span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder="Confirm password"
                                    {...register("confirmPassword", { required: "Confirm Password is required", validate: (value) => value === password || "Passwords do not match" })}
                                />

                                <span className="input-group-text cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                    <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                                </span>
                            </div>
                            <div className="error-space">{errors.confirmPassword?.message}</div>
                        </div>
                        <button className="btn register-btn w-100 mt-2">Create My Dukaan →</button>
                    </form>
                </div>
            </div>
        </div>
    )
}