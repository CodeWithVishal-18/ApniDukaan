import React, { useEffect, useState } from 'react'
import "./shopHome.css"
import { Link } from 'react-router-dom'

export default function ShopHome() {
    let [shops, setShops] = useState([])

    let token = localStorage.getItem("token")

    useEffect(() => {
        async function getAllShopForCustomer() {
            let response = await fetch("http://localhost:8080/api/v1/customer/shops", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            let responseObject = await response.json()
            setShops(responseObject.data)
        }
        getAllShopForCustomer()
    }, [])

    let getCategoryStyle = (category) => {
        let category1 = category?.trim().toLowerCase()

        switch (category1) {

            case "grocery":
                return {
                    cardBg: "#E8F2DE",
                    cardBorder: "#B7D49A",
                    title: "#355E1D",
                    text: "#567A3D"
                }

            case "bakery":
                return {
                    cardBg: "#FFE4EC",
                    cardBorder: "#F8B8CC",
                    title: "#B54769",
                    text: "#C25B7C"
                }

            case "pharmacy":
                return {
                    cardBg: "#DCEBFA",
                    cardBorder: "#A7C7F2",
                    title: "#245A96",
                    text: "#2F6DB3"
                }

            case "electronics":
                return {
                    cardBg: "#E8E5FF",
                    cardBorder: "#C7BEFF",
                    title: "#4B43A7",
                    text: "#5A53B8"
                }

            case "baby care":
                return {
                    cardBg: "#FDE8F5",
                    cardBorder: "#F8BEDD",
                    title: "#B63F82",
                    text: "#C04A8B"
                }

            default:
                return {
                    cardBg: "#F1F1F1",
                    cardBorder: "#DDDDDD",
                    title: "#333333",
                    text: "#666666"
                }
        }
    }

    return (
        <div className="shop-home">
            <div className="container py-5">
                <div className="mb-3">
                    <h3 className="shop-heading">Nearby Shops</h3>
                    <hr className='w-25 mb-0 ms-auto' />
                    <div className="d-flex justify-content-between">
                        <p className="shop-subheading">Discover trusted local stores around your area.</p>
                        <div className='d-flex justify-content-between w-25 shop-filter px-2'>
                            <span className=''><i className="bi bi-funnel"></i> Filter</span>
                            <span><i className="bi bi-filter-right"></i> Sort by Rating</span>
                        </div>
                    </div>

                </div>
                <div className="row g-4">
                    {shops.map((shop, index) => {
                        let style = getCategoryStyle(shop.category);
                        return (
                            <div className="col-12" key={index}>
                                <div className="shop-card" style={{ background: style.cardBg, borderColor: style.cardBorder }}>
                                    <div className="shop-image-wrapper my-auto">
                                        <img src={`http://localhost:8080/images/${shop.imageName}`} alt={shop.name} className="shop-image" />
                                    </div>
                                    <div className="shop-content">
                                        <h2 className="shop-title" style={{ color: style.title }}>{shop.name}</h2>
                                        <div className="category-bar" style={{ background: style.bg }} >
                                            <span className="category-pill text-capitalize" style={{ color: style.text }} ><span className="badge rounded-pill text-bg-secondary">{shop.category}</span></span>
                                        </div>
                                        <p className="shop-description" style={{ color: style.text }}>{shop.description}</p>

                                        <div className="d-flex align-items-center flex-wrap gap-3 mb-2">
                                            <span className="shop-location"><i className="bi bi-geo-alt-fill text-danger"></i> {shop.location}</span>
                                            <span className={shop.status === "open" ? "shop-status-open" : "shop-status-closed"} ><span className='text-capitalize'>● {shop.status}</span></span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <small className="shop-code">#{shop.shopId}</small>
                                            <Link to={`/shops/products/${shop.shopId}`}><span className='arrow-animation'><i className="bi bi-arrow-right-circle-fill text-primary fs-4"></i></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
