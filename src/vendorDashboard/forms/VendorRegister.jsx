import React,{useState} from 'react'
import { API_PATH } from '../helpers/ApiPath'

const VendorRegister = ({LoginHandler}) => {
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const handleSubmit=async(e)=>
    {
        e.preventDefault();
        try{
            const response=await fetch(`${API_PATH}/vendor/register`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({username,email,password})
            });
            const data= await response.json()
            if(response.ok)
            {   setUsername("");
                setEmail("");
                setPassword("");
                LoginHandler()
                alert('vendor Registered Successfully.')
            }
        }
        catch(error)
        {
            console.error('registration failed',error)
            alert('registration failed.')
        }
    }
    return <>
    <div className="registerForm">
      
      <div>
          <form className="authForm" onSubmit={handleSubmit}>
          <h3>Vendor Register</h3>
              <label>Username</label>
              <input name='username' value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Enter Username'/>
              <label>Email</label>
              <input name='email'  value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Your  Email'/>
              <label>Password</label>
              <input name='password' type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Your Password'/>
              <div className="btnSubmit">
                  <button type='submit'>Register</button>
              </div>
          </form>
      </div>
    </div>
    </>
}

export default VendorRegister
