import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Components/Home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Expense from './Components/Expense/Expense';
import View from './Components/ViewExp/View';

interface AppProps {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}

function App() {

  const [userId, setUserId] = useState('');
  return (
    <div>
            {/* {userId ? <Expense userId={userId} /> : <Login setUserId={setUserId} />} */}

  <Router>
        <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/reg' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/exp' element={<Expense/>}></Route>
        <Route path='/view' element={<View/>}></Route>
        </Routes>
       </Router>
   
    </div>
  );
}

export default App;
