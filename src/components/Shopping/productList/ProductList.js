import axios from "axios"
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getProducts } from '../../../ducks/productReducer'
import { getCart } from '../../../ducks/cartReducer'
import { withRouter, Link } from 'react-router-dom'
import './ProductList.css'


const ProductList = (props) => {

  const { getProducts } = props
  // const { product } = props
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    axios.get('/api/products')
      .then((res) => {
        // console.log('nice')
        getProducts(res.data)
      })
      .catch(err => console.log(err))
  }, [getProducts])

  const addToCart = (product) => {
    axios.post('/api/cart', { product_id: product.product_id, quantity })
      .then(res => getCart(res.data))
      .catch(err => console.log(err))
  }


  const { products } = props.productReducer
  // console.log(props)
  return (
    <div>
      {/* Collection */}
      <div className='products-display' >
        {products.map((product, i) => {
          return <div>
            <Link to={`/Product/${product.product_id}`} className='product-link'>
              <h3>{product.name}</h3>
              <img src={product.img} alt='product' height='150' width='150 />
              <p>{product.price}</p>
            </Link>
            <input min='1' type='number' name='quantity' placeholder='1' onChange={e => { setQuantity(e.target.value) }} />
            <button onClick={() => addToCart(product)}>Add To Cart</button>
          </div>
        })}
      </div>
    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { getProducts, getCart})(withRouter(ProductList))