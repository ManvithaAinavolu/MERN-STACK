import React from 'react'
import img from './image.jpeg';
import './Home.css'
import { Link } from 'react-router-dom';
function Home() {
  return (
    <div>
        <div className="container">

        <div className="image">
            <img src={img}/>
        </div>
      <div className="heading">
        <h1>Welcome to Expense Tracker</h1>
        <p>If you want to track your expenses then you are in a right place!</p>
        <ul>
            <li>Here you can create your account to keep track on your expenses.</li>
            <li>
            you can login at any time and track your monthly expenses.
            </li>
            <li>This will be user friendly and you can leave your feedback in feedback section.</li>
        </ul><br/>
        <div className='buttons'>
   <Link to='/exp'> <button>New Expense</button></Link>    
        <Link to='/reg'><button>Register</button></Link>
        </div>
       
          
 
      </div>
      
      </div>

    </div>
  )
}

export default Home
