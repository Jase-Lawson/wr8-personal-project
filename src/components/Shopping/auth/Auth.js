import { connect } from 'react-redux'
import { useState } from 'react'
import axios from 'axios'
import { getCustomer } from '../../../ducks/userReducer'
import './Auth.css'
import { withRouter, Link } from 'react-router-dom'

const Auth = (props) => {

  const [registerView, setRegisterView] = useState(false)
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
    verPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    birthday: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  })


  const handleInput = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value })
  }


  const handleLogin = (e) => {
    e.preventDefault()
    const { email, password } = userInput
    axios.post('/auth/login', { email, password })
      .then(res => {
        props.getCustomer(res.data)
        props.history.push('/')
      })
      .catch(err => console.log(err))
  }

  const handleRegister = (e) => {
    e.preventDefault()
    const { email, password, verPassword, firstName, lastName, phone, birthday, address, city, state, zipCode } = userInput

    if (password && password === verPassword) {
      axios.post('/auth/register', { firstName, lastName, password, email, phone, birthday, address, city, state, zipCode })
        .then(res => {
          props.getCustomer(res.data)
          props.history.push('/account')
        })
        .catch(err => console.log(err))
    } else {
      alert("Passwords don't match!")
    }
  }

  // console.log(props)

  return (
    <div className='auth-container'>
      <h2>Login</h2>
      {props.userReducer.customer ? (
        props.history.push('/account')
      ) : (
          <div className='auth-subContainer'>
            <form className='auth-form' onSubmit={(e) => { (registerView === false ? handleLogin(e) : handleRegister(e)) }} >
              <input className='input' placeholder='Email'
                name='email'
                type='email'
                value={userInput.email}
                onChange={handleInput}
              />
              <input className='input' placeholder='Password'
                name='password'
                type='password'
                value={userInput.password}
                onChange={handleInput}
              />
              {registerView ? (
                <div className='auth-register-view'>
                  <input className='input' placeholder='Verify Password'
                    name='verPassword'
                    type='password'
                    value={userInput.verPassword}
                    onChange={handleInput} />
                  <input className='input' placeholder='First Name'
                    name='firstName'
                    value={userInput.firstName}
                    onChange={handleInput} />
                  <input className='input' placeholder='Last Name'
                    name='lastName'
                    value={userInput.lastName}
                    onChange={handleInput} />
                  <input className='input' placeholder='Phone Number'
                    name='phone'
                    type='tel'
                    value={userInput.phone}
                    onChange={handleInput} />
                  {/* <input placeholder='Birthday'
                    name='birthday'
                    type='date'
                    value={userInput.birthday}
                    onChange={handleInput} />
                  <input placeholder='Street Address'
                    name='address'
                    value={userInput.address}
                    onChange={handleInput} />
                  <input placeholder='City'
                    name='city'
                    value={userInput.city}
                    onChange={handleInput} />
                  <input placeholder='State'
                    name='state'
                    value={userInput.state}
                    onChange={handleInput} />
                  <input placeholder='Zip Code'
                    name='zipCode'
                    type='number'
                    value={userInput.zipCode}
                    onChange={handleInput} /> */}
                  <button className='create-button' onClick={e => handleRegister(e)}>Create</button>
                </div>
              ) : (
                  <div>
                    <button className='login-button' onClick={e => handleLogin(e)}>Sign In</button>
                  </div>
                )}
            </form>

            <p>
              {registerView ? (
                <h5 onClick={() => setRegisterView(!registerView)}>
                  Already a Member? Click Here to Sign in!
                </h5>

              ) : (
                  <>
                    <Link className='link' to='/'>
                      <h5>
                        Forget your Password? Click Here to Reset
                  </h5>
                    </Link>
                    <h5 onClick={() => setRegisterView(!registerView)}>
                      New? Click Here to Create an Account!
                  </h5>
                  </>
                )}
            </p>
          </div>
        )}


    </div>
  )
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, { getCustomer })(withRouter(Auth))