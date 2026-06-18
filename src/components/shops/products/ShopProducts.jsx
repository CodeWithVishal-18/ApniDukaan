import React, { useEffect, useState } from 'react'
import './shopProduct.css'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCart } from '../../context/CartContext'

export default function ShopProducts() {
    let { shopId } = useParams()
    let [products, setProducts] = useState([])
    let [allProducts, setAllProducts] = useState([])
    let [selectedCategory, setSelectedCategory] = useState("")
    let [searchText, setSearchText] = useState("")
    let [sortDirection, setSortDirection] = useState("")
    let [quantities, setQuantities] = useState({})
    let { cartCount, setCartCount } = useCart();

    let totalItems = Object.values(quantities).reduce((sum, qty) => sum + qty, 0)

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

    async function addSelectedProductsToCart() {

        let user = JSON.parse(localStorage.getItem("user"))
        let selectedProducts = Object.entries(quantities).map(([productId, quantity]) => ({ productId, quantity }))

        let response = await fetch(`http://localhost:8080/api/v1/customer/cart/${user.id}`,
            {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(selectedProducts)
            }
        )
        let responseObject = await response.json()
        console.log(responseObject)
        setQuantities({})
        if (response.ok) {
            setCartCount(prev => prev + 1);
            toast.success("Added To Cart");
        }
    }

    function increaseQty(productId) {
        setQuantities(prev => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }))
    }

    function decreaseQty(productId) {
        setQuantities(prev => {
            let currentQty = prev[productId] || 0
            if (currentQty <= 1) {
                let updated = { ...prev }
                delete updated[productId]
                return updated
            }
            return { ...prev, [productId]: currentQty - 1 }
        })
    }

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
                                        {!quantities[product.productId] ? (
                                            <button className="plus-btn" onClick={() => increaseQty(product.productId)}>
                                                <i className="bi bi-plus-square" style={{ fontSize: "2rem" }}></i>
                                            </button>
                                        ) : (
                                            <div className="quantity-box">
                                                <button className="qty-btn btn-line" onClick={() => decreaseQty(product.productId)}> <i className="bi bi-dash-lg"></i></button>
                                                <span className="qty-value"> {quantities[product.productId]}</span>

                                                <button className="qty-btn btn-line1" onClick={() => increaseQty(product.productId)} > <i className="bi bi-plus-lg"></i> </button>
                                            </div>
                                        )}

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
            {totalItems > 0 && (
                <div className="cart-popup">
                    <button className="cart-popup-btn" onClick={addSelectedProductsToCart}>
                        Add {totalItems} Items To Cart
                    </button>
                </div>
            )}
        </div>
    )
}