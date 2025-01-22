import React, { useState, useEffect } from 'react';
import { API_PATH } from '../helpers/ApiPath';

const Firms = () => {
  const [firmData, setFirmData] = useState([]);
  const getFirmData = async () => {
    try {
      const response = await fetch(`${API_PATH}/vendor/getVendor`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setFirmData(data);
    } catch (error) {
      console.error('Error fetching firm data:', error);
    }
  };

  useEffect(() => {
    getFirmData();
  }, []);

  return (
    <>
      <h2 className="centered-heading">Top Restaurants</h2>
      <section className="firms">
        {firmData &&
          firmData.map((item, index) => (
            <div className="firmbox" key={index}>
              {Object.values(item.firm).map((firm, firmIndex) => (
                <div key={firmIndex}>
                  <div className="firmGroup">
                    <DynamicImage firm={firm} />
                    <div className="firmOffer">
                      {firm.offer} off on above ₹199
                    </div>
                  </div>
                  <div className="firmdetails">
                    <strong>{firm.firmName}</strong>
                    <div className="firmarea">{firm.region}</div>
                    <div className="firmarea">{firm.area}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
      </section>
    </>
  );
};

const DynamicImage = ({ firm }) => {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`${API_PATH}/uploads/${firm.image}`, {
          method: 'GET',
          mode: 'cors',
        });
        if (!response.ok) throw new Error(`Image not found: ${firm.image}`);
        const blob = await response.blob();
        setImageSrc(URL.createObjectURL(blob));
      } catch (error) {
        console.error('Error fetching image:', error);
        setImageSrc('/path/to/fallback-image.jpg'); 
      }
    };

    fetchImage();
  }, [firm.image]);

  return <img src={imageSrc} alt={firm.firmName} />;
};

export default Firms;
