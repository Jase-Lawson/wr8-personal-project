import './Footer.css'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'



const Footer = (props) => {
  const { customer } = props.userReducer

  return (
    <div className='footer-container'>
      <div className='footer-content'>
        <div className='footer-subscribe'>
          <h4> Let's be Homies</h4>
          <div className='subscribe-inputs'>
            <input className='input' placeholder='Email Address' />
            <button className='button'>SUBSCRIBE</button>
          </div>
        </div>
        <div className='footer-newsletter'>
          <h3>Newsletter</h3>
          <p className='footer-p'>
            Join the Stella & Haas Newsletter to get exclusive discounts, access to new releases, style tips, and more.
          </p>
        </div>
        <div className='footer-nav'>
          <h3>Navigation</h3>
          {(customer && customer.isadmin === true) ? (
            <div className='nav-link'>
              <Link to='/Returns' className='footer-link'>Returns & Exchanges</Link>
              <Link to='/Shipping' className='footer-link'>Shipping</Link>
              <Link to='/Contact' className='footer-link'>Contact Us</Link>
              <Link to='/Wholesale' className='footer-link'>Wholesale</Link>
              <Link to='/About' className='footer-link'>About Us</Link>
              <Link to='/Ambassadors' className='footer-link'>Ambassadors</Link>
              <Link to='/admin/products' className='footer-link'>Add Products</Link>
            </div>
          ) : (
              <div className='nav-link'>
                <Link to='/Returns' className='footer-link'>Returns & Exchanges</Link>
                <Link to='/Shipping' className='footer-link'>Shipping</Link>
                <Link to='/Contact' className='footer-link'>Contact Us</Link>
                <Link to='/Wholesale' className='footer-link'>Wholesale</Link>
                <Link to='/About' className='footer-link'>About Us</Link>
                <Link to='/Ambassadors' className='footer-link'>Ambassadors</Link>
              </div>
            )}
        </div>
      </div>
      <div className='footer-dev'>
        Website Developed by: Jase Lawson
      </div>
    </div >
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {})(withRouter(Footer))