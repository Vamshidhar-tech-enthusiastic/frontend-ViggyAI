import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_PATH } from '../helpers/ApiPath';

const ProductMenu = () => {
  const { id,firmName } = useParams();
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch(`${API_PATH}/product/getProductByFirm/${id}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setMenuData(data.products);
        console.log(data.products)
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    };

    fetchMenuData();
  }, [id]);
  const Order=(product)=>
  {
    alert("You have ordered 🛒 "+product+". Now, sit back and relax😁")
  }
  return (
    <section className="productSection">
        <h3>{firmName}</h3>
           {menuData &&
            menuData.map((item, index) => (
                <div className="product-box">
                <div>
                <div>
                <strong>{item.productName}</strong>
              </div>
              <div>
              ₹{item.price}
              </div>
              <div>
                {item.description}
              </div>
                </div>
              <div className='productGroup'>
                <img src={`${API_PATH}/uploads/${item.image}`} />
                <div className='AddButton' onClick={()=>Order(item.productName)}>
                    Order
                </div>
              </div>
                </div>
              
            ))}
          
    </section>
  );
};

export default ProductMenu;
