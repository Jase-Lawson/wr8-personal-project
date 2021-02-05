import { connect } from 'react-redux'

const Wholesale = (props) => {

  return (

    <div>
      Wholesale
    </div >
  )
}
const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {})(Wholesale)