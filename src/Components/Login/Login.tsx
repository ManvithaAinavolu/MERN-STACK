import React, { useState } from 'react'
import './Login.css'
import { loginUser } from '../../ApiCalls'
import { Link } from 'react-router-dom';
function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit=async()=>{
    try {
      const response = await loginUser({ email, password });
      setSuccessMessage(response.msg);
      // console.log(response.user._id); // Log user ID received from the server
      // setUserId(response.user._id);
     } catch (err) {
      
    }
  }
  
  return (
    <div className='container3'>
        <h1>Login</h1>
        {successMessage && <p className="success-message">{successMessage}</p>}

        <div className="form-group">
            <label className='lab'>Email id</label>
            <input type="email" 
            placeholder='Enter your email id'
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
            <label className='lab'>Password</label>
            <input type="password" 
            placeholder='Enter your Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </div>
       <Link to={'/'}> <button className='button' onClick={handleSubmit}>Login</button></Link>
        <p>Don't have an account? <span><a href='/reg'>Register</a></span></p>
    </div>
  )
}

export default Login
