import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { getCustomer, clearCustomer } from '../../../ducks/userReducer'
import './Account.css'

const Account = (props) => {

  const { customer } = props.userReducer
  const [editView, setEditView] = useState(false)
  const [userInput, setUserInput] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  })
  useEffect(() => {
    if (customer) {
      setUserInput({
        email: customer.email,
        firstName: customer.first_name,
        lastName: customer.last_name,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        state: customer.state,
        zipCode: customer.zip_code,
      })
    }

  }, [customer])



  const handleInput = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value })
  }

  const handleEdit = () => {
    axios.put('/auth/edit', userInput)
      .then(res => {
        props.getCustomer(res.data)
        props.history.push('/account')
        setEditView(false)
      })
      .catch(err => console.log(err))

  }

  const handleLogout = () => {
    axios.get('/auth/logout')
      .then(() => {
        console.log('nice')
        props.clearCustomer()
        props.history.push('/')
        console.log('nicer')
      }
      )
  }

  // console.log(props)
  return (
    <div>
      <h2>My Account</h2>
      {customer ? (
        <div className='account-container'>
          <h3> Hey {customer.first_name ? customer.first_name : null}! </h3>
          <div className='account-subContainer'>
            {editView === false ? (
              <div>
                <button onClick={() => setEditView(!editView)}>Edit Account Info</button>
                <button onClick={() => handleLogout()}>Log Out</button>
              </div>)
              : (
                <div className='account-inputs'>
                  <input className='input' placeholder={customer.first_name}
                    name='firstName'
                    value={userInput.firstName}
                    onChange={handleInput} />
                  <input className='input' placeholder={customer.last_name}
                    name='lastName'
                    value={userInput.lastName}
                    onChange={handleInput} />
                  <input className='input' placeholder={customer.email}
                    name='email'
                    value={userInput.email}
                    onChange={handleInput} />
                  <input className='input' placeholder={customer.phone}
                    name='phone'
                    type='tel'
                    value={userInput.phone}
                    onChange={handleInput} />
                  {/* <input placeholder={customer.address}
                    name='address'
                    value={userInput.address}
                    onChange={handleInput} />
                  <input placeholder={customer.city}
                    name='city'
                    value={userInput.city}
                    onChange={handleInput} />
                  <input placeholder={customer.state}
                    name='state'
                    value={userInput.state}
                    onChange={handleInput} />
                  <input placeholder={customer.zip_code}
                    name='zipCode'
                    type='number'
                    value={userInput.zipCode}
                    onChange={handleInput} /> */}
                  <button onClick={() => handleEdit()}>Submit</button>
                </div>
              )}

          </div>
          <div>
            Order History
          </div>
        </div>
      ) : (
          props.history.push('/account/login')
        )}
    </div>
  )
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, { getCustomer, clearCustomer })(Account)