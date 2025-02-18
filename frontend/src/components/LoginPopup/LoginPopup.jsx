import React, {  useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../assets/context/StoreContext';
import axios from "axios"

const LoginPopup = ({setShowLogin}) => {
  const {url,setToken,}=useContext(StoreContext)
    const[currState,setCurrstate]=useState("Login");
    const [data,setData]= useState({
      name:"",
      email:"",
      password:""
    })
    const onChangeHandler =(event)=>{
      const name= event.target.name
      const value =event.target.value
      setData(data=>({...data,[name]:value}))
    }
   const onLogin =async (event)=>{
         event.preventDefault()
         let newurl = url;
         if (currState==="Login") {
          newurl += "/api/user/login"
         }
         else{
          newurl += "/api/user/register"
         }
         const response= await axios.post(newurl,data)
         if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token",response.data.token);
          setShowLogin(false)
         }
         else{
          alert(response.data.message)
         }
   }
  return (
    <div className='login-popup'>
        <form  onSubmit={onLogin}className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img  onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currState==="Login"?<></>: <input type="text" name='name'onChange={onChangeHandler} value={data.name} placeholder='Enter name' required/>}
                <input type="email" name='email'onChange={onChangeHandler} value={data.email} placeholder='Enter email address' required />
                <input type="password" name='password'onChange={onChangeHandler} value={data.password}  placeholder='password' required/>

            </div>
            <button type='submit'>{currState==="Sign Up"?"Create account":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By continuing,I Agree terms of use and policy.</p>
            </div>
            {currState==="Login"?<p>Create a new account?<span onClick={()=>setCurrstate("Sign Up")}  >Click here</span></p>: 
              <p>Already have an account?<span  onClick={()=>setCurrstate("Login")}>Login here</span></p>}
        
     
        </form>

    </div>
  )
}

export default LoginPopup