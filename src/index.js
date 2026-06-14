import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './components/App.jsx';
import Home from './components/home/Home.jsx';
import VendorHome from './components/vendor/VendorHome.jsx';
import ShopHome from './components/shops/ShopHome.jsx';
import ShopProducts from './components/shops/products/ShopProducts.jsx';
import Login from './components/Auth/Login.jsx';
import Register from './components/Auth/Register.jsx';
import { ToastContainer, Zoom } from 'react-toastify';

let projectRoutes = createBrowserRouter([{
  path: "/",
  element: <App />,
  children: [
    { element: <Home />, index: true },
    {path:"vendor",element:<VendorHome/>},
    {path:"shops",element:<ShopHome/>},
    {path:"shops/products/:shopId",element:<ShopProducts/>},
    {path:"login",element:<Login/>},
    {path:"register",element:<Register/>}
  ]
}])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<>
<RouterProvider router={projectRoutes}/>
<ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Zoom}
    />
</>);
