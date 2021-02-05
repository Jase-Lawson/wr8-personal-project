import { connect } from 'react-redux'

const Contact = (props) => {

  return (

    <div>
      Contact
    </div >
  )
}
const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {})(Contact)