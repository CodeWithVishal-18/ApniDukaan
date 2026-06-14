import React, { useEffect, useState } from 'react'
import './shopProduct.css'
import { useParams } from 'react-router-dom'

export default function ShopProducts() {
    let { shopId } = useParams()
    let [products, setProducts] = useState([])
    let [allProducts, setAllProducts] = useState([])
    let [selectedCategory, setSelectedCategory] = useState("")
    let [searchText, setSearchText] = useState("")
    let [sortDirection, setSortDirection] = useState("")

    let token = localStorage.getItem("token")

    useEffect(() => {
        async function getAllProducts() {
            let response = await fetch(`http://localhost:8080/api/v1/customer/products/shop/${shopId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            let responseObject = await response.json()
            setAllProducts(responseObject.data || [])
        }
        getAllProducts()
    }, [shopId])

    useEffect(() => {
        async function getFilteredProducts() {
            let response = await fetch(`http://localhost:8080/api/v1/filter?category=${selectedCategory}&productName=${searchText}&sortDirection=${sortDirection}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            let responseObject = await response.json()
            let filteredProducts = responseObject.data.filter(product => product.shop.shopId === shopId)
            setProducts(filteredProducts)
        }
        getFilteredProducts()
    }, [selectedCategory, searchText, sortDirection, shopId])

    let categories = [...new Set(allProducts.map(item => item.category))]

    return (
        <div className="shop-products-page">
            <div className="container p-0">
                <div className="row g-0">

                    <div className="col-3 col-md-2 sidebar-wrapper">
                        <div className="sidebar-content">
                            <div className={`sidebar-category ${selectedCategory === "" && "active-sidebar-category"}`} onClick={() => setSelectedCategory("")} >
                                <div className="sidebar-image-box">
                                    <img src="/images/category/AllGroceryCategory.jpg" alt="category" className="sidebar-image" />
                                </div>

                                <p className="sidebar-category-name">All</p>
                            </div>

                            {categories.map((category, index) => (
                                <div key={index} className={`sidebar-category ${selectedCategory === category && "active-sidebar-category"}`}
                                    onClick={() => setSelectedCategory(category)}>
                                    <div className="sidebar-category-box">
                                        <p className="sidebar-category-name text-capitalize">{category}</p>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>

                    <div className="col-9 col-md-10 product-section">
                        <div className="top-bar-wrapper">
                            <input type="text" className="search-input" placeholder="Search products..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />

                            <select className="sort-select" value={sortDirection} onChange={(e) => setSortDirection(e.target.value)} >
                                <option value="">Sort By Price</option>
                                <option value="asc">Low To High</option>
                                <option value="desc">High To Low</option>
                            </select>
                        </div>

                        <div className="row g-4">
                            {products.map((product) => (
                                <div className="col-6 col-lg-4 col-xl-3" key={product.productId} >
                                    <div className="customer-product-card">
                                        <button className="plus-btn"><i className="bi bi-plus-lg"></i></button>

                                        <div className="product-image-wrapper">
                                            <img src={`http://localhost:8080/productimages/${product.imageName}`} alt="product" className="product-image" />
                                        </div>

                                        <small className="delivery-time">13 MINS</small>

                                        <h5 className="product-title">{product.productName}</h5>

                                        <p className="product-description">{product.description}</p>

                                        <p className="product-weight">{product.weight} {product.unit}</p>

                                        <p className="discount-text">{product.discount}% OFF</p>

                                        <div className="d-flex align-items-center gap-2">
                                            <h5 className="final-price mb-0">₹{product.finalPrice}</h5>

                                            <span className="original-price">₹{product.price}</span>
                                        </div>

                                        {product.lowStock && <div className="low-stock-badge">Low Stock</div>}

                                    </div>
                                </div>
                            ))}

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}