import axios from 'axios';
import { useEffect } from 'react'
import { getCart } from '../../../ducks/cartReducer';
import { connect } from 'react-redux'
import CartItem from '../cartItem/CartItem';

const Cart = (props) => {

  const { getCart } = props
  const { cartItems } = props.cartReducer

  useEffect(() => {
    axios.get(`/api/cart`)
      .then(res => getCart(res.data))
      .catch(err => console.log(err))

  }, [props.userReducer.user]);


  // console.log(props)
  return (
    <div>
      {props.userReducer.customer ? (
        <>
          <h1>
            This is the Cart being returned
          </h1>
          {cartItems?.map((item, i) => {
            return <CartItem item={item} key={item.junction_id} />
          })}
        </>
      ) : (props.history.push('/Account/Login'))
      }

    </div >
  )
}


const mapStateToProps = (reduxState) => {
  return {
    userReducer: reduxState.userReducer,
    cartReducer: reduxState.cartReducer
  }
};

export default connect(mapStateToProps, { getCart })(Cart)