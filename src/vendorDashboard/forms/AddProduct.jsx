import React,{useState} from 'react'
import { API_PATH } from '../helpers/ApiPath';

const AddProduct = () => {

      const [productName, setproductName] = useState("");
      const [price, setprice] = useState("");
      const [category, setcategory] = useState([]);
      const [file, setfile] = useState("");
      const [bestSeller, setbestSeller] = useState("");
      const [description, setdescription] = useState("");
      
    
      const CatChange = (event) => {
        const value = event.target.value;
        if (category.includes(value)) {
          setcategory(category.filter((item) => item !== value));
        } else {
          setcategory([...category, value]);
        }
      };
      const ImageHandle = (event) => {
          const selected = event.target.files[0];
          setfile(selected);
        };
      
        const ProductHandle = async (e) => {
          e.preventDefault();
          const token=localStorage.getItem('loginToken')
          const firmId = localStorage.getItem('firmId');
          if (!token || !firmId) {
            console.log("Unauthorized.");
            return;
          }
      
          const formData = new FormData();
      
          formData.append('productName', productName);
          formData.append('price', price);
          formData.append('description', description);
          formData.append('image', file);
          formData.append('bestSeller',bestSeller);
          category.forEach((value) => {
            formData.append('category', value);
          });
      
          try {
              const response = await fetch(`${API_PATH}/product/addProduct/${firmId}`, {
                method: 'POST',
                body: formData
              });
                const data = await response.json();
                if (response.ok) {
                  setproductName("");
                  setprice("");
                  setbestSeller("");
                  setdescription("");
                  setcategory([]);
                  setfile("");
                  alert('Product Added Successfully.');}
      
            } 
            catch (error)
             {
              console.error("Network error:", error.message);
              alert("An error occurred while adding the firm. Please try again.");
            }
        };
      

    return <>
    <div className="addProduct">
      
      <div>
          <form className="tableForm" onSubmit={ProductHandle}>
          <h3>Add Product</h3>
              <label>ProductName</label>
              <input value={productName} onChange={(e)=>setproductName(e.target.value)} placeholder='Enter Product name'/>
              <label>Price</label>
              <input value={price} onChange={(e)=>setprice(e.target.value)} placeholder='Enter Product Price'/>
              <div className="check-cat">
              <label>Category</label>
              <div className="inputcont">
                <div className="checkboxcont">
                  <label>Veg</label>
                  <input
                    type="checkbox"
                    checked={category.includes('veg')}
                    onChange={CatChange}
                    value="veg"
                  />
                </div>
                <div className="checkboxcont">
                  <label>Non-Veg</label>
                  <input
                    type="checkbox"
                    checked={category.includes('non-veg')}
                    onChange={CatChange}
                    value="non-veg"
                  />
                </div>
              </div>
            </div>
              <label>BestSeller</label>
              <input value={bestSeller} onChange={(e)=>setbestSeller(e.target.value)} placeholder='Enter Yes/No'/>
              <label>Description</label>
              <input value={description} onChange={(e)=>setdescription(e.target.value)} placeholder='Enter Your Product Description'/>
              <label>Product Image</label>
              <input  onChange={ImageHandle} type="file"/>
              <div className="btnSubmit">
                  <button type='submit'>Add Product</button>
              </div>
          </form>
      </div>
    </div>
    </>
}

export default AddProduct
