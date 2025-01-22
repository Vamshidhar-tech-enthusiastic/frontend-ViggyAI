import React from 'react'

const SideBar = ({FirmHandler,ProductHandler,AllproductsHandler}) => {
  return <>
  <div className="sideBar">
    <ul>
        {!(localStorage.getItem('Restaurant')) && <li onClick={FirmHandler}>Add Firm</li>}
        <li onClick={ProductHandler}>Add Product</li>
        <li onClick={AllproductsHandler}>All Products</li>
    </ul>
  </div>
  </>
}

export default SideBar
