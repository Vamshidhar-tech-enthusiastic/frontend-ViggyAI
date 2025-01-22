import React,{useState} from 'react'
import { API_PATH } from '../helpers/ApiPath'
const VendorLogin = () => {
      const [email, setEmail]=useState("")
      const [password, setPassword]=useState("")

      const loginHandlers=async(e)=>
      {
          e.preventDefault();
          console.log("Entered.",email)
          try{
              const response=await fetch(`${API_PATH}/vendor/login`,{
              method:'POST',
              headers:{
                  'Content-Type':'application/json'
              },
              body:JSON.stringify({email,password})
              });
              const data= await response.json()
              console.log(data)
              if(response.ok)
              {  
                  localStorage.setItem("loginToken",data.token)
                  setEmail("");
                  setPassword("");
                  alert('Login Successful.')
                 
              }
              const vid=data.vendorId;
              try{
              const vresponse=await fetch(`${API_PATH}/vendor/getId/${vid}`);
              const vdata=await vresponse.json();
             
              if(vresponse.ok)
                {  
                    const vfirmId=vdata.vendorFirmId;
                    localStorage.setItem('firmId',vfirmId)
                   
                }
                try{
                    const presponse=await fetch(`${API_PATH}/product/getProductByFirm/${vdata.vendorFirmId}`);
                    const pdata=await presponse.json();
                   
                    if(presponse.ok)
                      {  
                          const firmName=pdata.firmName;
                          localStorage.setItem('Restaurant',firmName)
                          
                      }
                }
                catch(error)
                {
                    console.log(error);
                }
                }
                catch(error)
                {
                    console.log(error);
                }
                
             
                window.location.reload()
          }
          catch(error)
          {
              
              alert('Login failed.',error)
          }
      }

  return (
  <div className="loginForm">
    
    <div>
        <form className="authForm" onSubmit={loginHandlers}>
        <h3>Vendor Login</h3>
            <label>Email</label>
            <input type="text" name="email" value = {email} onChange={(e)=>setEmail(e.target.value)}  placeholder='Enter Your  Email'/>
            <label>Password</label>
            <input type="password"  name="password" value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder='Enter Your Password'/>
            <div className="btnSubmit">
                <button type='submit'>Login</button>
            </div>
        </form>
    </div>
  </div>
  )
}

export default VendorLogin
