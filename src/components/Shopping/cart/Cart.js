// import axios from 'axios';
import { useEffect } from 'react'
import { getCustomer } from '../../../ducks/userReducer';
import { getAllCartItems } from '../../../ducks/cartReducer';
import { connect } from 'react-redux'

const Cart = (props) => {

  // const { getCustomer, getAllCartItems } = props;

  // useEffect(() => {
  //   axios.post('/auth/login', {

  //     email: 'jmlhaxor@gmail.com',
  //     password: 'password'

  //   }).then(res => {
  //     getCustomer(res.data)
  //   })

  // }, [getCustomer]);

  useEffect(() => {
    getAllCartItems()
    // console.log(props)

  }, [props.userReducer.user]);

  // console.log(props)
  return (
    <div>
      <h1>
        This is the Cart being returned
      </h1>
    </div>
  )
}


const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { getCustomer, getAllCartItems })(Cart)