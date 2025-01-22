import React, { useState } from 'react';
import { API_PATH } from '../helpers/ApiPath';

const AddFirm = () => {
  const [FirmName, setFirmname] = useState("");
  const [Area, setArea] = useState("");
  const [Category, setCategory] = useState([]);
  const [Region, setRegion] = useState([]);
  const [Offer, setOffer] = useState("");
  const [file, setFile] = useState(null);

  const CategoryChange = (event) => {
    const value = event.target.value;
    if (Category.includes(value)) {
      setCategory(Category.filter((item) => item !== value));
    } else {
      setCategory([...Category, value]);
    }
  };

  const RegionChange = (event) => {
    const value = event.target.value;
    if (Region.includes(value)) {
      setRegion(Region.filter((item) => item !== value));
    } else {
      setRegion([...Region, value]);
    }
  };

  const ImageHandle = (event) => {
    const selected = event.target.files[0];
    setFile(selected);
  };

  const FirmHandle = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('loginToken');
    if (!token) {
      console.log("Unauthorized.");
      return;
    }

    const formData = new FormData();

    formData.append('firmName', FirmName);
    formData.append('area', Area);
    {formData.append('offer', Offer);
    formData.append('image', file);}
    Region.forEach((value) => {
      formData.append('region', value);
    });
    Category.forEach((value) => {
      formData.append('category', value);
    });

    try {
        const response = await fetch(`${API_PATH}/firm/addFirm`, {
          method: 'POST',
          headers: {
            'token': `${token}`,
            
          },
          body: formData,
        });
          const data = await response.json();
          if (response.ok) {
            setFirmname("");
            setArea("");
            setRegion([]);
            setOffer("");
            setCategory([]);
            setFile(null);
            alert('Firm Added Successfully.');
          }
            const firmId=data.firmId;
            
            localStorage.setItem('firmId',firmId)
            const presponse=await fetch(`${API_PATH}/product/getProductByFirm/${firmId}`);
            const pdata=await presponse.json();
            
            if(presponse.ok)
            {  
              const firmName=pdata.firmName;
              localStorage.setItem('Restaurant',firmName)
                                
            }
             window.location.reload()

      } catch (error)
       {
        console.error("Network error:", error.message);
        alert("An error occurred while adding the firm. Please try again.");
      }
  };

  return (
    <>
      <div className="addFirm">
        <div>
          <form className="tableForm" onSubmit={FirmHandle}>
            <h3>Add Firm</h3>
            <label>Firm Name</label>
            <input
              name="FirmName"
              value={FirmName}
              onChange={(e) => setFirmname(e.target.value)}
              placeholder="Enter Firm Name"
            />
            <label>Area</label>
            <input
              name="Area"
              value={Area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Enter Your Firm Area"
            />
            <div className="check-cat">
              <label>Category</label>
              <div className="inputcont">
                <div className="checkboxcont">
                  <label>Veg</label>
                  <input
                    type="checkbox"
                    checked={Category.includes('veg')}
                    onChange={CategoryChange}
                    value="veg"
                  />
                </div>
                <div className="checkboxcont">
                  <label>Non-Veg</label>
                  <input
                    type="checkbox"
                    checked={Category.includes('non-veg')}
                    onChange={CategoryChange}
                    value="non-veg"
                  />
                </div>
              </div>
            </div>
            <div className="check-region">
              <label>Region</label>
              <div className="inputcont">
                <div className="region-check">
                  <label>North Indian</label>
                  <input
                    type="checkbox"
                    checked={Region.includes('north-indian')}
                    onChange={RegionChange}
                    value="north-indian"
                  />
                </div>
                <div className="region-check">
                  <label>South Indian</label>
                  <input
                    type="checkbox"
                    checked={Region.includes('south-indian')}
                    onChange={RegionChange}
                    value="south-indian"
                  />
                </div>
                <div className="region-check">
                  <label>Chinese</label>
                  <input
                    type="checkbox"
                    checked={Region.includes('chinese')}
                    onChange={RegionChange}
                    value="chinese"
                  />
                </div>
                <div className="region-check">
                  <label>Bakery</label>
                  <input
                    type="checkbox"
                    checked={Region.includes('bakery')}
                    onChange={RegionChange}
                    value="bakery"
                  />
                </div>
              </div>
            </div>
            <label>Firm Image</label>
            <input type="file" onChange={ImageHandle} />
            <label>Offer</label>
            <input
              name="Offer"
              value={Offer}
              onChange={(e) => setOffer(e.target.value)}
              placeholder="Enter Your Firm Offer"
            />
            <div className="btnSubmit">
              <button type="submit">Add Firm</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddFirm;
