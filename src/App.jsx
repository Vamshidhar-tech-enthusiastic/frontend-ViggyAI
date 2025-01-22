import React from 'react'
import HomePage from './vendorDashboard/pages/HomePage'
import {Routes,Route} from'react-router-dom'
import './App.css'
import ProductMenu from './vendorDashboard/components/ProductMenu'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path="/product-menu/:id/:firmName" element={<ProductMenu />} />
      </Routes>
    </div>
  )
}

export default App
