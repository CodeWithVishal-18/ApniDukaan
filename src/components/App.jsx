import React, { memo } from 'react'
import Navbar from './navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './footer/Footer'

let App = memo(() => {
    return (
        <>
            <div style={{ backgroundColor: "#f9f6f0" }}>
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </>
    )
})

export default App;