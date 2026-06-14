import React from 'react'
import "./leftUI.css"

export default function LeftUI() {
    return (
        <div className="col-lg-5 auth-left d-none d-lg-flex">
            <div className="text-center w-100">
                <div className="logo-circle mx-auto mb-4"><i className="bi bi-shop"></i></div>
                <h1 className="fw-bold text-white">Apni<span className="text-orange">Dukaan</span></h1>
                <p className="text-light small">Your Digital Shops, Your Rules</p>

                <div className="mt-5 text-start">
                    <div className="feature-row">
                        <div className="feature-icon"><i className="bi bi-display"></i></div>
                        <div>
                            <h6 className="fw-bold mb-1 text-light">Easy Store Setup</h6>
                            <small className='text-light'>Go live in minutes — no tech skills needed.</small>
                        </div>
                    </div>

                    <div className="feature-row">
                        <div className="feature-icon"><i className="bi bi-box-seam"></i></div>
                        <div>
                            <h6 className="fw-bold mb-1 text-light">Unlimited Products</h6>
                            <small className='text-light'>List everything — from chai to chandeliers.</small>
                        </div>
                    </div>

                    <div className="feature-row border-0">
                        <div className="feature-icon"><i className="bi bi-people"></i></div>
                        <div>
                            <h6 className="fw-bold mb-1 text-light">Direct To Customer</h6>
                            <small className='text-light'>Sell directly, keep 100% margins.</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
