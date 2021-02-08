// import axios from 'axios';
import { useEffect } from 'react'
import { getCustomer } from '../../../ducks/userReducer';
import { getCart } from '../../../ducks/cartReducer';
import { connect } from 'react-redux'
import axios from 'axios'

const Cart = (props) => {

  // const { customer_id } = props.userReducer.customer
  const { getCart } = props
  const { cartItems } = props.cartReducer

  useEffect(() => {
    axios.get(`/api/cart`)
      .then(res => getCart(res.data))
      .catch(err => console.log(err))

  }, [props.userReducer.user]);

  const handleAdd = (item) => {

  }

  const handleSubtract = (item) => {

  }

  const handleRemove = (item) => {

  }

  console.log(props)
  return (
    <div>
      {props.userReducer.customer ? (
        <>
          <h1>
            This is the Cart being returned
          </h1>
          {cartItems.map((item, i) => {
            return <div>
              <h3>{cartItems[i].name}</h3>
              <img src={cartItems[i].img} alt='product' height='50' width='50' />
              <p>{cartItems[i].price}</p>
              <button onClick={() => { handleSubtract(item) }}>-</button>
              <input placeholder={cartItems[i].quantity} />
              <button onClick={() => { handleAdd(item) }}>+</button>
              <button onClick={() => { handleRemove(item) }} >Remove</button>
              <p>Total</p>
              {cartItems[i].price * cartItems[i].quantity}
            </div>
          })}
        </>
      ) : (props.history.push('/Account/Login'))
      }

    </div >
  )
}


const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { getCustomer, getCart })(Cart)