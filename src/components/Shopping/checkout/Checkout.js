import { connect } from 'react-redux';


const Checkout = (props) => {

 


  return (
    <div>
      Checkout Page

     

    </div>
  )
}


const mapStateToProps = (reduxState) => {
  return {
    userReducer: reduxState.userReducer,
    cartReducer: reduxState.cartReducer
  }
};

export default connect(mapStateToProps, {})(Checkout)