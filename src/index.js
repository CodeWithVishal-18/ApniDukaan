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

let projectRoutes = createBrowserRouter([{
  path: "/",
  element: <App />,
  children: [
    { element: <Home />, index: true },
    {path:"vendor",element:<VendorHome/>},
    {path:"shops",element:<ShopHome/>}
  ]
}])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={projectRoutes}/>);
