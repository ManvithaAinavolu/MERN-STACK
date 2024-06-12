import React, { useState } from 'react';
import './Exp.css'; 
import { addExpense } from '../../ApiCalls';
import { Link } from 'react-router-dom';



function Expense() {
  const [email,setEmail]=useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async () => {

    try {
      if (!email || !title || !amount || !category || !date || !description) {
        setErrorMessage('All fields are required.');
        return;
      }

      const expenseData = {
        
        email,
        title,
        amount: parseFloat(amount),
        category,
        date: new Date(date), 
        description,
      };

      const res = await addExpense(expenseData);

      setSuccessMessage(res.msg);
      console.log(res)
      setEmail('')
      setTitle('');
      setAmount('');
      setCategory('');
      setDate('');
      setDescription('');
    } catch (err) {
      // console.error(err);
      // setErrorMessage('An error occurred while adding the expense.');
    }
    
  };
const handleCross=()=>{
  setSuccessMessage('')
}
  return (
    <div className="expense-form-container">
       <div className="instructions-container">
        <div className="instructions">
          <h3>Instructions</h3>
          <li>Fill out the form below to add a new expense.</li>
          <li>Please enter the values accordingly.</li>
          <li>Make sure to enter all required information accurately.</li>
          <li>This add expense form adds the new expense that you have spent.</li>
          <li>you can visit and access the expenses at any time.</li>
          <li>If you are new to this then start by adding the expenses from the form.</li>
          <li>If you already have added any expenses you can view by clciking below button.</li>
        </div>
    <Link to='/view'> <button className="view-expenses-btn">View Expenses</button></Link>   
      </div>
      <div className="form-container">
      <h2>Add Expense</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}<button className='cross' onClick={handleCross}>x</button></p>}
      <div className="form">
      <div className="form-group">
          <label>Email Id</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email Id"
          />
        </div>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
        </div>
        <div className="form-group">
          <label>Amount ($)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category"
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Enter date"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          ></textarea>
        </div>
        <button onClick={handleSubmit}>Add Expense</button>
      </div>
      </div>
      
      
    </div>
  );
};

export default Expense;
