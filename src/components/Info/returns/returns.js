import { connect } from 'react-redux'
import './returns.css'

const Returns = (props) => {

  return (
    <div className='info-container'>
      <h1>Returns & Exchanges</h1>
      <div className='info-content' >
        <h5>Stella & Haas Return Policy:</h5>
        <p>
          No returns, no exchanges, no exceptions.
       </p>
        <h5>Only returns in the form of shop credit or replacement items for pieces that were damaged in shipment will be processed.</h5>
        <p>
          On all of our product listings, we have specified the lengths, thickness, and materials of our products.
        </p>
        <p>
          Please take the time to measure where these items would fall on your ears/neck/chest/wrist/ankle/fingers before making a purchase to ensure it is the correct size for you. Ensure you have chosen the correct color, size, etc, BEFORE completing checkout.
        </p>
        <p>
          If you need to edit your order, you can request an edit before your order is shipped, but after it has been shipped we cannot change your order.
        </p>
        <h5>Because we are a very small company and with the added concerns of pandemic, we are NOT processing any exchanges or returns on items.</h5>
        <h5>We are more than happy to answer any questions you may have on items BEFORE you complete your purchase to ensure a smooth shopping process and help you get the pieces that are best for you. </h5>
        <p>We currently only offer returns in the form of shop credit or replacement items for damaged products. Please note the time frames and exceptions to policy below.
        </p>
        <p>
          <li>All Earrings, Huggies, and Cuffs are FINAL SALE. No returns or exchanges for earrings at ANY time. </li>
          <li>Any Sale items are FINAL SALE. No returns or exchanges on any sale/clearance items. </li>
        </p>
        <p>
          Please fill out the form below if you received a product damaged in the shipping process, received an incorrect item, or an item from your order was missing in your package. It must be submitted within 3 days of your order being delivered to be eligible for the return process..
        </p>
        <p>
          A photo of the damaged product must be attached to the form, as well as an explanation.
        </p>
        <p>
          A member of the customer service team will reach out within 3 business days after your form is submitted.
        </p>
        <h5>Please ONLY fill out the form if your return request falls within the guidelines listed above. No exceptions will be made.</h5>
      </div >
    </div>
  )
}
const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {})(Returns)