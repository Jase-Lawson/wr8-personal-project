import { withRouter, Link } from 'react-router-dom'
import './Nav.css'
import account from '../../../assets/account.svg'
import search from '../../../assets/search.svg'
import bag from '../../../assets/bag.svg'
import SH from '../../../assets/SHLogo.jpg'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getCustomer } from '../../../ducks/userReducer'
import axios from 'axios'

const Nav = (props) => {

  const { getCustomer } = props

  const [dropdownView, setDropdownView] = useState(false)

  useEffect(() => {
    axios.get('/auth/customer')
      .then(res => getCustomer(res.data))
      .catch(err => console.log(err))
  }, [getCustomer])


  return (
    <header className='nav-container' >
      <div className='banner'> FREE SHIPPING ON ORDERS OVER $25! </div>
      <nav className='nav-bar'>
        <Link to='/' > <img alt='Stella * Haas Logo' src={SH} className='logo' /> </Link>
        <div className='nav-links'>
          <Link to='/Collections' className='nav-link'>Necklaces</Link>
          <Link to='/Collections' className='nav-link'>Earrings</Link>
          <Link to='/Collections' className='nav-link'>Bracelets</Link>
          <Link to='/Collections' className='nav-link'>Rings</Link>
          <Link to='/Collections' className='nav-link'>Gift Ideas</Link>
          <Link to='/Collections' className='nav-link'>Accessories</Link>
          <Link to='/Collections' className='nav-link'>SALE</Link>
        </div>
        <div className='nav-icons'>
          <Link to='/search' className='icon' > <img alt='search' src={search} /></Link>
          <Link to='/cart' className='icon' > <img alt='shopping bag' src={bag} /> </Link>
          <Link to='/account' className='icon' > <img alt='account' src={account} /> </Link>
        </div>
        <div className='mobile-view' >
          <div className='nav-dropdown' onClick={() => setDropdownView(!dropdownView)}>
            <div className='hamburger' />
            <div className='hamburger' />
            <div className='hamburger' />
          </div>
          {dropdownView ? (
            <div className='mobile-menu'>
              <Link to='/search' className='mobile-icon' > <img alt='search' src={search} /> Search</Link>
              <Link to='/cart' className='mobile-icon' > <img alt='shopping bag' src={bag} />Cart</Link>
              <Link to='/account' className='mobile-icon' > <img alt='account' src={account} />Account</Link>
            </div>
          ) : null}
        </div>

      </nav>
    </header>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { getCustomer })(withRouter(Nav))