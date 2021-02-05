import { connect } from 'react-redux'

const About = (props) => {

  return (

    <div>
      About
    </div >
  )
}
const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {})(About)