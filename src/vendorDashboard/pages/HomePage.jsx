import React ,{useState,useEffect} from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import VendorLogin from '../forms/VendorLogin'
import VendorRegister from '../forms/VendorRegister'
import AddFirm from '../forms/AddFirm'
import AddProduct from '../forms/AddProduct'

import AllProducts from '../components/AllProducts'
import Firms from '../components/Firms'
import FirmCollections from '../components/FirmCollections'

const HomePage = () => {
  const [Login,setLogin]=useState(false);
  const [Register,setRegister]=useState(false);
  const [Firm,setFirm]=useState(false);
  const [Product,setProduct]=useState(false);
  const [Allproducts,setAllproducts]=useState(false);
  const [Logout,setLogout]=useState(false)
  const [sidebar,setSideBar]=useState(false)
  const [allfirms,setAllFirms]=useState(false)

  const LoginHandler=()=>
  {
        setLogin(true)
        setRegister(false)
        setFirm(false)
        setProduct(false)
        setAllFirms(false)
        setAllproducts(false)
  }
  const RegisterHandler=()=>
  {
        setRegister(true)
        setLogin(false)
        setFirm(false)
        setProduct(false)
        setAllFirms(false)
        setAllproducts(false)
  }
  const FirmHandler=()=>
  {
        setFirm(true)
        setLogin(false)
        setRegister(false)
        setProduct(false)
        setAllFirms(false)
        setAllproducts(false)
  }
  const ProductHandler=()=>
  {
        setProduct(true)
        setLogin(false)
        setRegister(false)
        setFirm(false)
        setAllFirms(false)
        setAllproducts(false)
  }

  const AllproductsHandler=()=>
  {
                setProduct(false)
                setLogin(false)
                setRegister(false)
                setFirm(false)
                setAllFirms(false)
                setAllproducts(true)
  }
  useEffect(()=>{
      const logintoken=localStorage.getItem('loginToken')
      if(logintoken)
      {
            setLogout(true)
            setSideBar(true)
      }
      else
      {
            setSideBar(false)
            setAllFirms(true)
      }
      
  },[])
  const logout=()=>
  {   
      confirm("Are you sure to logout")
      localStorage.removeItem('loginToken');
      localStorage.removeItem('firmId');
      localStorage.removeItem('Restaurant')
      setLogout(false)
      window.location.reload()
  }
  
  return <>
  <section className='Home'>
    <NavBar LoginHandler={LoginHandler} RegisterHandler={RegisterHandler} Logout={Logout} logout={logout}/>
    <div className="HomePage">
    {sidebar&& <SideBar FirmHandler={FirmHandler} ProductHandler={ProductHandler} AllproductsHandler={AllproductsHandler}/>}
    {Login &&  <VendorLogin/>}
    {Register && <VendorRegister LoginHandler={LoginHandler}/>}
    {Firm && <AddFirm/>}
    {Product && <AddProduct/>}
    {Allproducts && <AllProducts/>}
    <div className='Box'>
    {((allfirms) ) && <div className='firmsbox'><Firms/></div>}
    {(allfirms) && <div className='collectionbox'><FirmCollections/></div>}
    </div>
    </div>
  </section>
  </>
}

export default HomePage
