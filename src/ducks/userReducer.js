const initialState = {
  customer: null,
}

const GET_CUSTOMER = 'GET_CUSTOMER'
const CLEAR_CUSTOMER = 'CLEAR_CUSTOMER'

export function getCustomer(customer) {
  return {
    type: GET_CUSTOMER,
    payload: customer
  }
}

export function clearCustomer() {
  return {
    type: CLEAR_CUSTOMER,
    payload: null
  }
}


export default function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case GET_CUSTOMER:
      return { ...state, customer: payload }

    case CLEAR_CUSTOMER:
      return { ...state, customer: payload }

    default:
      return state
  }
}