import { connect } from 'react-redux'

const Ambassadors = (props) => {

  return (

    <div>
      Ambassadors
    </div >
  )
}
const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {})(Ambassadors)