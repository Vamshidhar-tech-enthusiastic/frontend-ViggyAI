import React, { useState, useEffect } from 'react';
import { API_PATH } from '../helpers/ApiPath';

const AllProducts = () => {
    const [Products, setProducts] = useState([]);

    const productsHandler = async () => {
        const firmId = localStorage.getItem('firmId');
        try {
            const response = await fetch(`${API_PATH}/product/getProductByFirm/${firmId}`);
            const newProducts = await response.json();
            setProducts(newProducts.products);
        } catch (error) {
            alert(error);
        }
    };

    const deleteById = async (productId) => {
        
        try {
            const response =  fetch(`${API_PATH}/product/${productId}`, {
                method: 'DELETE',
            });
            
                setProducts(Products.filter((product) => product._id !== productId));
                alert('Product deleted successfully.');
           
        } catch (error) {
            alert(`Error deleting product: ${error.message}`);
        }
    };

    useEffect(() => {
        productsHandler();
    },[]);

    return (
        <div>
            {Products.length === 0 ? (
                <p>No Products Added</p>
            ) : (
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Products.map((item) => (
                            <tr key={item._id}>
                                <td>{item.productName}</td>
                                <td>{item.price}/-</td>
                                <td>
                                    {item.image && (
                                        <img
                                            src={`${API_PATH}/uploads/${item.image}`}
                                            alt={item.productName}
                                            style={{ width: '60px', height: '50px' }}
                                        />
                                    )}
                                </td>
                                <td>
                                    <button onClick={() => deleteById(item._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AllProducts;
