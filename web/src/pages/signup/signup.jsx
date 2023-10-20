// import { useState } from 'react'
import { useRef, useState } from 'react'
import axios from 'axios'
import './signup.css'

const baseUrl = 'http://localhost:5001'

const Signup = () => {

    const firstNameInputRef = useRef(null)
    const lastNameInputRef = useRef(null)
    const emailInputRef = useRef(null)
    const passwordInputRef = useRef(null)
    const repeatPasswordInputRef = useRef(null)

    const [passwordErrorClass, setPasswordErrorClass] = useState("hidden")
    const [alertMessage , setAlertMessage] = useState('')


    const signupSubmitHandler = async (e) =>{
        e.preventDefault()

        if(passwordInputRef.current.value !== repeatPasswordInputRef.current.value){
            setPasswordErrorClass('')
            return
        }else{
            setPasswordErrorClass('hidden')
        }

        try{
            const response = await axios.post(`${baseUrl}/api/v1/mongoDB/signup`, {
                firstName: firstNameInputRef.current.value,
                lastName: lastNameInputRef.current.value,
                email: emailInputRef.current.value,
                password: passwordInputRef.current.value,
            })
            console.log(response.data.message);
            setAlertMessage(response.data.message)
        }catch (error){
            console.log(error.response.data);
            setAlertMessage(error.response.data.message)
        }}


    return (
        <div>
        <h1>Sign Up</h1>
        <form id="signupForm" onSubmit={signupSubmitHandler}>
          <label htmlFor="firstNameInput">First Name:</label>
          <input ref={firstNameInputRef} type="text" name="firstNameInput" id="firstNameInput" required />
  
          <br />
          <label htmlFor="lastNameInput">Last Name:</label>
          <input ref={lastNameInputRef} type="text" name="lastNameInput" id="lastNameInput" required />
  
          <br />
          <label htmlFor="emailInput">Email:</label>
          <input ref={emailInputRef} type="email" name="emailInput" id="emailInput" required />
  
          <br />

          <label htmlFor="passwordInput">Password:</label>
          <input ref={passwordInputRef} type="password" name="passwordInput" id="passwordInput" />
  
          <br />

          <label htmlFor="repeatPasswordInput">Repeat Password:</label>
          <input ref={repeatPasswordInputRef} type="password" name="repeatPasswordInput" id="repeatPasswordInput" />
          <p className={`passwordErrorMsg ${passwordErrorClass}` } id='passwordErrorMsg'>Password do not match.</p>
  
          <br />

  
          <button type="submit">Sign Up</button>
        </form>
      </div>
    )
}

export default Signup