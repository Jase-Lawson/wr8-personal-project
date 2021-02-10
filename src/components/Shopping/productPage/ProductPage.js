// import axios from 'axios'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { getProduct } from '../../../ducks/productReducer'
import { getCart } from '../../../ducks/cartReducer'
import './ProductPage.css'


const Product = (props) => {

  const { product } = props.productReducer
  const { getProduct } = props
  const { product_id } = props.match.params
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    axios.get(`/api/product/${product_id}`)
      .then((res) => {
        getProduct(res.data)
      })
      .catch(err => console.log(err))
  }, [product_id, getProduct])

  const addToCart = (product) => {
    axios.post('/api/cart', { product_id: product.product_id, quantity })
      .then(res => getCart(res.data))
      .catch(err => console.log(err))
  }

  // console.log(props)
  return (
    <div>
      <h3>{product.name}</h3>
      <img src={product.img} height='100' width='100' alt='product' />
      <p>{product.price}</p>
      <input min='1' type='number' name='quantity' placeholder='1' onChange={e => { setQuantity(e.target.value) }} />
      <button onClick={() => addToCart(product)}>Add To Cart</button>
    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { getProduct, getCart })(Product)