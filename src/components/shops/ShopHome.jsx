import React, { useEffect, useState } from 'react'
import "./shopHome.css"
import { Link } from 'react-router-dom'

export default function ShopHome() {
    let [shops, setShops] = useState([])
    let [allShops, setAllShops] = useState([])
    let [selectedCategory, setSelectedCategory] = useState("")
    let [searchText, setSearchText] = useState("")

    let token = localStorage.getItem("token")

    useEffect(() => {
        async function getAllShopForCustomer() {
            let response = await fetch("http://localhost:8080/api/v1/customer/shops", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            let responseObject = await response.json()
            setAllShops(responseObject.data)
            setShops(responseObject.data)
        }
        getAllShopForCustomer()
    }, [token])

    useEffect(() => {
        async function getFilteredShops() {
            let response = await fetch(`http://localhost:8080/api/v1/filter/shops?category=${selectedCategory}&shopName=${searchText}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            let responseObject = await response.json()
            setShops(responseObject.data)
        }
        getFilteredShops()
    }, [selectedCategory, searchText,token])

    let categories = [...new Set(allShops.map(item => item.category))]

    let getCategoryStyle = (category) => {let category1 = category?.trim().toLowerCase()

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
                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center">
                        <h3 className="shop-heading mb-2 mb-sm-0">Nearby Shops</h3>
                        <div className="d-flex flex-column flex-sm-row">
                            <select className="form-select form-select-sm mb-2 mb-sm-0 me-sm-2" aria-label="Small select example" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={{backgroundColor:"#f9f6f0"}}>
                                <option value="" selected>Filter Category</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </select>
                            <input className="form-control form-control-sm" type="search" placeholder="Search" aria-label="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)} style={{backgroundColor:"#f9f6f0"}}/>
                        </div>
                    </div>

                    <p className="shop-subheading">Discover trusted local stores around your area.</p>
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
                                        <h2 className="shop-title text-capitalize" style={{ color: style.title }}>{shop.name}</h2>
                                        <div className="category-bar" style={{ background: style.bg }} >
                                            <span className="category-pill text-capitalize" style={{ color: style.text }} ><span className="badge rounded-pill text-bg-secondary">{shop.category}</span></span>
                                        </div>
                                        <p className="shop-description text-capitalize" style={{ color: style.text }}>{shop.description}</p>

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
