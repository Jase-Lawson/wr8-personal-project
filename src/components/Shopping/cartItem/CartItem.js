import axios from 'axios';
import { useState, useEffect } from 'react'
import { getCart } from '../../../ducks/cartReducer';
import { connect } from 'react-redux'


const CartItem = (props) => {

  const { item } = props
  const { getCart } = props
  const [quantity, setQuantity] = useState(item.quantity)

  useEffect(() => {
    axios.get(`/api/cart`)
      .then(res => getCart(res.data))
      .catch(err => console.log(err))

  }, [item.quantity]);


  const handleRemove = (item) => {
    axios.delete('/api/cart', { product_id: item.product_id, junction_id: item.junction_id })
      .then((res) => { getCart(res.data) })
      .catch(err => console.log(err))
  }

  const handleUpdate = (item) => {
    console.log(item.product_id)
    axios.put('/api/cart', { quantity: quantity, product_id: item.product_id, junction_id: item.junction_id })
      .then(res => {
        console.log(res.data)
        getCart(res.data)
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <div>
        <h3>{item.name}</h3>
        <img src={item.img} alt='product' height='50' width='50' />
        <p>{item.price}</p>
        <input onChange={e => { setQuantity(e.target.value) }} value={quantity} type='number' min='1' />
        <button onClick={() => { handleRemove(item) }} >Remove</button>
        <button onClick={() => { handleUpdate(item) }} >Update Quantity</button>
        <p>Total</p>
        {item.price * item.quantity}
      </div>
    </div>
  )
}

const mapStateToProps = (reduxState) => {
  return {
    userReducer: reduxState.userReducer,
    cartReducer: reduxState.cartReducer
  }
};

export default connect(mapStateToProps, { getCart })(CartItem)