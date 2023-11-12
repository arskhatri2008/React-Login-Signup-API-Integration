import './App.css';
import { Routes, Route, Link, Navigate } from "react-router-dom";


import Home from './pages/home/home';
import About from './pages/about/about'
import Chat from './pages/chat/chat'
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = 'http://localhost:5001'

const App = () => { 
  const [isLogin , setIsLogin] = useState(false)
  
  useEffect(()=>{
    const checkLoginStatus = async ()=>{
      try{
        const response = await axios.get(`${baseUrl}/api/v1/mongoDB/ping`,{withCredentials:true})
        setIsLogin(true)
      }catch(error){
        console.log(error)
        setIsLogin(false)
      }
    }
    checkLoginStatus()
  })
  
  return (
    <div>
      {isLogin ? (
            <nav>
              <ul>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/chat'}>Chat</Link></li>
                <li><Link to={'/about'}>About</Link></li>
                {/* <li><Link to={'/login'}>Login</Link></li>
                <li><Link to={'/signup'}>Sign Up</Link></li> */}
              </ul>
            </nav>      
      ) : (
      <nav>
        <ul>
          {/* <li><Link to={'/'}>Home</Link></li>
          <li><Link to={'/chat'}>Chat</Link></li>
          <li><Link to={'/about'}>About</Link></li> */}
          <li><Link to={'/login'}>Login</Link></li>
          <li><Link to={'/signup'}>Sign Up</Link></li>
        </ul>
      </nav>

      )}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='chat' element={<Chat />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='*' element={<Navigate to='/' replace={true} />} />
      </Routes>
    </div>
  );
}

export default App;
