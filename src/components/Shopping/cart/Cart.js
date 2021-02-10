import axios from 'axios';
import { useEffect, useCallback, useState } from 'react';
import { getCart } from '../../../ducks/cartReducer';
import { connect } from 'react-redux';
import CartItem from '../cartItem/CartItem';
import StripeCheckout from 'react-stripe-checkout';

const public_key = 'pk_test_51IJMLkKgnnTCroimhePbn43EEyPf7UMmo8qZrbtpJX6i9cENs2Se9qJ6qBIcy1DdmAYBlqxtVzYk10jAcaEcVuXh009QbAVspy'

const Cart = (props) => {

  const { getCart } = props
  const { cartItems } = props.cartReducer
  const [total, setTotal] = useState(0)

  const cartTotal = useCallback(() => {
    let cart = 0
    for (let i = 0; i < cartItems.length; i++) {
      cart += (cartItems[i].quantity * cartItems[i].price)
    }
    setTotal(cart)
    // console.log(total)
  }, [cartItems])

  useEffect(() => {
    axios.get(`/api/cart`)
      .then(res => {
        getCart(res.data)
      })
      .catch(err => console.log(err))

  }, [props.userReducer.user, getCart]);

  useEffect(() => {
    cartTotal()

  }, [cartItems, cartTotal])

  const onToken = (token) => {
    token.card = void 0;
    console.log('token', token);
    axios.post('/api/payment', { token, amount: 100 }).then(response => {
      alert('we are in business')
    });
  }




  // console.log(props)
  return (
    <div>
      {props.userReducer.customer ? (
        <>
          <h1>
            This is the Cart being returned
          </h1>

          {total}

          <StripeCheckout
            token={onToken}
            stripeKey={public_key}
            amount={total * 100}
          />

          {/* <Link to='/Checkout'>Checkout</Link> */}
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