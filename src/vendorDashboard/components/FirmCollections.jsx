import React,{useState,useEffect} from 'react'
import { API_PATH } from '../helpers/ApiPath'
import { useNavigate } from 'react-router-dom';

const FirmCollections = () => {

  const [firmData, setFirmData] = useState([]);
  const navigate = useNavigate();
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
    const Cliked = (id,fname) => {
      
      navigate(`/product-menu/${id}/${fname}`);
    };
    return (
      <>
        <h2 className="centered-heading">Restaurants with online food delivery</h2>
        <section className="firmSection">
          {firmData && 
            firmData.map((item, index) => (
              <div className="firmbox" key={index}>
                {Object.values(item.firm).map((firm, firmIndex) => (
                  <div key={firmIndex}>
                    <div className="FirmGroup" onClick={() => Cliked(firm._id,firm.firmName)}>
                      <DynamicImage firm={firm} />
                      {<div className="firmOffer">
                        {firm.offer} off on above ₹199
                      </div>}
                    </div>
                    {<div className="firmdetail">
                      <strong>{firm.firmName}</strong>
                      <div className="firmarea">{firm.region}</div>
                      <div className="firmarea">{firm.area}</div>
                    </div>}
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
}

export default FirmCollections
