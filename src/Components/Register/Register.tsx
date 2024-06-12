import React, { useState } from 'react'
import './Reg.css';
import { registerUser } from '../../ApiCalls';

function Register() {

  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [phone,setPhone]=useState<number|''>('');
  const [password,setPassword]=useState('');
  const [cpassword,setCpassword]=useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errMsg,setErrMsg]=useState('');
  const handleSubmit=async()=>{
    if (password !== cpassword) {
      setErrMsg('Passwords do not match');
      return;
    }
    
    try{
      const res=await registerUser({name,email,phone:Number(phone),password,cpassword});
      console.log(res.msg)
      setSuccessMessage(res.msg); // Set success message
      clearForm(); 
    }
catch(err){

}
  }
  const clearForm=()=>{
    setName('');
    setEmail('')
    setPhone('')
    setPassword('')
    setCpassword('')
    setErrMsg('')
   

  }

  return (
    <div className='container2'>
       
    <div className="form">
        <h1>Registration Form</h1>
        {errMsg && <p className='error'>{errMsg}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <label>Name</label>
        <input 
        placeholder='enter Your name'
        value={name}
        onChange={(e) => setName(e.target.value)}/>

        <label>Email Id</label>
        <input placeholder='enter Your Email Id'
        value={email}
         onChange={(e) => setEmail(e.target.value)}/> 

        <label>Phone</label>
        <input 
        placeholder='enter Your Mobile no'
        value={phone}
        onChange={(e) => setPhone(parseFloat(e.target.value))}/>

        <label>Password</label>
        <input placeholder='enter Password'
        value={password}
         onChange={(e) => setPassword(e.target.value)}/>

        <label>Confirm Password</label>
        <input placeholder='Confirm Password'
        value={cpassword}
        onChange={(e) => setCpassword(e.target.value)}/>

         <button onClick={handleSubmit}>Register</button>
         {}
         <p>Already have an Account? <span><a href='/login'>Login</a></span></p>

    </div>
      
    </div>
  )
}

export default Register
