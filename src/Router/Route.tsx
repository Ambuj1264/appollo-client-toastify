import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
// import Home from '../components/Home'
import Login from '../components/Login'
import Register from '../components/Register'
import NavScrollExample from '../components/NavbarScrolleExample'
import {Footer} from "../components/Footer"
import First from '../components/First'
import Product from '../components/Product'
const Routers: React.FC = () => {
  return (
    <>
<BrowserRouter>
<NavScrollExample />
<Routes>

    <Route path="/" element={<First/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/product" element={<Product/>}/>
    
</Routes>
<Footer></Footer>
</BrowserRouter>


    </>
  )
}

export default Routers