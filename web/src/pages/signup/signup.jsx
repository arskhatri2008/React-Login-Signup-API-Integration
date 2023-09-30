import { useRef } from 'react'
import './signup.css'

const baseUrl = 'http://localhost:5001'

const Signup = () => {

    const firstNameInputRef = useRef(null)
    const lastNameInputRef = useRef(null)
    const emailInputRef = useRef(null)
    const passwordInputRef = useRef(null)
    const repeatPasswordInputRef = useRef(null)


    const signupSubmitHandler = (e) =>{
        e.preventDefault()

        axios.post(`${baseUrl}/signup`, {
            
        })
    }


    return (
        <div>
        <h1>Sign Up</h1>
        <form id="signupForm" onSubmit={signupSubmitHandler}>
          <label for="firstNameInput">First Name:</label>
          <input ref={firstNameInputRef} type="text" name="firstNameInput" id="firstNameInput" required />
  
          <br />
          <label for="lastNameInput">Last Name:</label>
          <input ref={lastNameInputRef} type="text" name="lastNameInput" id="lastNameInput" required />
  
          <br />
          <label for="emailInput">Email:</label>
          <input ref={emailInputRef} type="email" name="emailInput" id="emailInput" required />
  
          <br />

          <label for="passwordInput">Password:</label>
          <input ref={passwordInputRef} type="password" name="passwordInput" id="passwordInput" />
  
          <br />

          <label for="repeatPasswordInput">Repeat Password:</label>
          <input ref={repeatPasswordInputRef} type="password" name="repeatPasswordInput" id="repeatPasswordInput" />
  
          <br />

  
          <button type="submit">Sign Up</button>
        </form>
      </div>
    )
}

export default Signup