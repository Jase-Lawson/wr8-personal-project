import axios from "axios"
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { getProducts } from '../../../ducks/productReducer'
import { withRouter, Link } from 'react-router-dom'


const ProductList = (props) => {

  const { getProducts } = props

  useEffect(() => {
    axios.get('/api/products')
      .then((res) => {
        // console.log('nice')
        getProducts(res.data)
      })
      .catch(err => console.log(err))
  }, [getProducts])


  const { products } = props.productReducer
  // console.log(props)
  return (
    <div>
      Product List Page

      {products.map((product, i) => {
        return <Link to={`/Product/${product.product_id}`} className='product-link'>
          <h3>{products[i].name}</h3>
          <img src={products[i].img} alt='product' height='50' width='50' />
          <p>{products[i].price}</p>
        </Link>
      })}
    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { getProducts })(withRouter(ProductList))