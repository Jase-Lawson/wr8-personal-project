// import axios from 'axios'
import { connect } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import { getProduct } from '../../../ducks/productReducer'


const Product = (props) => {

  const { product } = props.productReducer
  const { getProduct } = props
  const { product_id } = props.match.params

  useEffect(() => {
    axios.get(`/api/product/${product_id}`)
      .then((res) => {
        getProduct(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  console.log(props)
  return (
    <div>
      <h3>{product.name}</h3>
      <img src={product.img} height='100' width='100' />
      <p>{product.price}</p>
    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { getProduct })(Product)