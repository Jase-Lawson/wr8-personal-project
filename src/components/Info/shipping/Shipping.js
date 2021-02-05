import { connect } from 'react-redux'

const Shipping = (props) => {

  return (

    <div>
      Shipping
    </div >
  )
}
const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {})(Shipping)