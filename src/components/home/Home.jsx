import React, { memo } from 'react'
import "./home.css"
import { Link } from 'react-router-dom';

let Home = memo(() => {
    return (
        <>
            <section className="container mt-5 overflow-hidden" style={{ minHeight: "75vh" }}>
                <div className="row align-items-center">
                    <div className="col-lg-6 order-1 order-lg-1">
                        <p className="fw-bold text-uppercase mb-3" style={{ color: "#ff6b35", letterSpacing: "2px", fontSize: "14px" }} > <i className="bi bi-stars text-warning fs-5"></i> Your Neighborhood, Online </p>
                        <h1 className="fw-bold" style={{ color: "#123524", lineHeight: "1.05", fontSize: "clamp(3rem, 6vw, 4.5rem)" }} >
                            Local shops,
                            <br />delivered in<br />
                            <span style={{ color: "#ff6b35" }}>minutes.</span>
                        </h1>

                        <p className="mt-4" style={{ color: "#5c6c63", fontSize: "clamp(1rem, 2vw, 1.35rem)", lineHeight: "1.5", maxWidth: "600px" }} >
                            Apni Dukaan connects you to the best kirana, bakery, pharmacy and fresh-veg vendors right in your gali — same trust, way faster.
                        </p>
                        <div className="d-flex flex-wrap gap-3 mt-4">
                            <button className="btn text-white rounded-pill px-4 py-3 fw-semibold hero-btn" style={{ backgroundColor: "#ff6b35", fontSize: "1rem" }} > Order from your gali → </button>
                            <button className="btn rounded-pill px-4 py-3 fw-semibold" style={{ border: "1.5px solid #123524", color: "#123524", fontSize: "1rem" }} > See how it works </button>
                        </div>

                        <div className="d-flex flex-wrap gap-4 mt-4">
                            <div className="d-flex align-items-center gap-2">
                                <span style={{ color: "#ff6b35" }}><i className="bi bi-patch-check-fill"></i></span>
                                <span className="text-secondary small">50+ verified shops</span>
                            </div>

                            <div className="d-flex align-items-center gap-2">
                                <span style={{ color: "#ff6b35" }}><i className="bi bi-watch"></i></span>
                                <span className="text-secondary small">Avg 18 min delivery</span>
                            </div>

                            <div className="d-flex align-items-center gap-2">
                                <span style={{ color: "#ff6b35" }}><i className="bi bi-balloon-heart"></i></span>
                                <span className="text-secondary small">0% commission for vendors</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 position-relative order-2 order-lg-2">
                        <img src="./images/hero-bg.jpeg" alt="local indian market" className="img-fluid rounded-5 shadow-lg w-100" style={{ objectFit: "cover", maxHeight: "650px" }} />

                        <div className="position-absolute bg-white shadow rounded-pill d-flex align-items-center gap-2" style={{ top: "20px", right: "20px", padding: "10px 18px" }} >
                            <span style={{ color: "#ffb703" }}><i className="bi bi-star-fill text-warning"></i> <i className="bi bi-star-fill text-warning"></i> <i className="bi bi-star-fill text-warning"></i> <i className="bi bi-star-fill text-warning"></i></span>
                            <span className="fw-semibold" style={{ color: "#123524" }} > 4.1 trust </span>
                        </div>

                        <div className="position-absolute bg-white rounded-4 shadow-lg p-2 floating-card">
                            <img src="./images/home-delivery.png" alt="delivery rider" className="img-fluid rounded-4" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                        </div>
                    </div>
                </div>
            </section>

            <section className='mt-5 py-3' style={{ background: "#123524" }}>
                <div className="container">
                    <div className="row text-center">
                        <div className="col-6 col-lg-3">
                            <p className="fw-bold stats-number" style={{ color: "#ff6b35" }} > 50+ </p>
                            <p className="mb-0" style={{ color: "#b8c1b8", fontSize: "0.9rem" }} > Local Shops Onboarded </p>
                        </div>

                        <div className="col-6 col-lg-3">
                            <p className="fw-bold stats-number" style={{ color: "#ff6b35" }} > 100+ </p>
                            <p className="mb-0" style={{ color: "#b8c1b8", fontSize: "0.9rem" }} > Orders Delivered Weekly </p>
                        </div>

                        <div className="col-6 col-lg-3">
                            <p className="fw-bold stats-number" style={{ color: "#ff6b35" }} > 18 min </p>
                            <p className="mb-0" style={{ color: "#b8c1b8", fontSize: "0.9rem" }} > Average Delivery Time </p>
                        </div>
                        <div className="col-6 col-lg-3">
                            <p className="fw-bold stats-number" style={{ color: "#ff6b35" }} > 100% </p>
                            <p className="mb-0" style={{ color: "#b8c1b8", fontSize: "0.9rem" }} > Local</p>
                        </div>

                    </div>
                </div>
            </section>

            <section id='works' className="container mt-5">
                <div className="align-items-center gy-4 mb-5">
                    <div className="">

                        <p className="fw-bold text-uppercase mb-3" style={{ color: "#ff6b35", letterSpacing: "2px", fontSize: "14px" }} > How it works </p>

                        <p className="fw-bold how-title" style={{ color: "#123524", lineHeight: "1.1" }} > Three taps. Your dukaan, at home. </p>

                        <p className="mx-4" style={{ color: "#667085", fontSize: "1.2rem", lineHeight: "1.4" }} >
                            We built Apni Dukaan to be as easy as walking
                            down to the corner shop - minus the heat,
                            the traffic, and the “bhaiya, change nahi hai”.
                        </p>

                    </div>
                </div>

                <div className="row g-4">
                    <div className="col-lg-4 col-md-6">

                        <div className="how-card position-relative">

                            <h1 className="step-number"> 01 </h1>

                            <div className="icon-box"> <i className="bi bi-geo-alt"></i> </div>

                            <h3 className="fw-bold mb-3" style={{ color: "#123524" }}> Set Your Gali </h3>

                            <p className="text-secondary mb-0"> Drop a pin or pick your locality. We show only the shops within 1.5 km. </p>

                        </div>

                    </div>

                    <div className="col-lg-4 col-md-6">

                        <div className="how-card position-relative">

                            <h1 className="step-number"> 02 </h1>

                            <div className="icon-box"> <i className="bi bi-search"></i> </div>

                            <h3 className="fw-bold mb-3" style={{ color: "#123524" }}> Pick a Shop </h3>

                            <p className="text-secondary mb-0"> Browse kirana, bakery, pharmacy, dairy and more with real reviews. </p>

                        </div>

                    </div>

                    <div className="col-lg-4 col-md-6">

                        <div className="how-card position-relative">

                            <h1 className="step-number"> 03 </h1>

                            <div className="icon-box"> <i className="bi bi-bag-dash"></i> </div>

                            <h3 className="fw-bold mb-3" style={{ color: "#123524" }}> Order & Relax </h3>

                            <p className="text-secondary mb-0"> Pay online or cash on delivery. Most orders land in under 20 minutes. </p>

                        </div>
                    </div>
                </div>
            </section>

            <section id='partner' className="container py-3 mt-5">
                <div className="owner-section">

                    <div className="row align-items-center gy-5">
                        <div className="col-lg-7">

                            <p className="fw-bold text-uppercase mb-3" style={{ color: "#ff6b35", letterSpacing: "3px", fontSize: "14px" }} > For Shop Owners</p>

                            <h3 className="fw-bold owner-title mb-4" style={{ color: "white", lineHeight: "1.1" }} > Bring your dukaan online in <br /> <span style={{ color: "#ff6b35" }}> 10 minutes. </span></h3>

                            <p className="mb-4" style={{ color: "#b8c1b8", fontSize: "1.3rem", lineHeight: "1.8", maxWidth: "700px" }} >
                                Zero commission for the first 6 months.
                                Free onboarding visit. We handle the tech,
                                you handle the trust.
                            </p>
                            <div className="d-flex flex-wrap gap-3">

                                <Link to={"vendor"}><button className="btn owner-btn text-white fw-semibold rounded-pill px-4 py-3">Become a partner →</button></Link>

                                <button className="btn btn-outline-light rounded-pill px-4 py-3 fw-semibold">Learn more</button>

                            </div>
                        </div>
                        <div className="col-lg-5">

                            <div className="row g-4">
                                <div className="col-6">
                                    <div className="info-box">
                                        <h3 className="info-number">₹0</h3>
                                        <p className="mb-0 text-light">Setup fee</p>
                                    </div>

                                </div>

                                <div className="col-6">
                                    <div className="info-box">
                                        <h3 className="info-number">0%</h3>
                                        <p className="mb-0 text-light">Commission · 6 months</p>
                                    </div>

                                </div>
                                <div className="col-6">
                                    <div className="info-box">
                                        <h3 className="info-number">24h</h3>
                                        <p className="mb-0 text-light">Onboarding</p>
                                    </div>

                                </div>

                                <div className="col-6">
                                    <div className="info-box">
                                        <h3 className="info-number">1:1</h3>
                                        <p className="mb-0 text-light">Dedicated rep</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
})

export default Home;