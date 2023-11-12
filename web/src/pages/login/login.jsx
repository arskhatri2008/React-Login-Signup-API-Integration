import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import "./login.css";

const baseUrl = 'http://localhost:5001'

const Login = () => {
  
  const emailInputRef = useRef(null)
  const passwordInputRef = useRef(null)

  const [alertMessage , setAlertMessage] = useState('')
  const [errorMessage , setErrorMessage] = useState('')

  useEffect(()=>{
      setTimeout(() => {
          setAlertMessage('')
          setErrorMessage('')
      }, 5000);
  },[alertMessage,errorMessage])

  const loginSubmitHandler = async (e) =>{
    e.preventDefault()

    try{
        const response = await axios.post(`${baseUrl}/api/v1/mongoDB/login`, {
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value,
        },{
          withCredentials: true
        })
        console.log(response?.data?.message);
        setAlertMessage(response?.data?.message)
    }catch (error){
        console.log(error.response?.data);
        setErrorMessage(error.response?.data?.message)
    }}

  return (
    <div>
      <h1>Login</h1>
      <form id="loginForm" onSubmit={loginSubmitHandler}>
        <label htmlFor="emailInput">email:</label>
        <input type="email" autoComplete="email" name="emailInput" id="emailInput" ref={emailInputRef} required />

        <br />
        <label htmlFor="passwordInput">password:</label>
        <input type="password" autoComplete="current-password" name="passwordInput" id="passwordInput" ref={passwordInputRef} />

        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
