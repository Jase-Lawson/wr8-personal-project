const initialState = {
  cartItems: null,
}

const GET_ALL_CART_ITEMS = 'GET_ALL_CART_ITEMS'

export function getAllCartItems(cartItems) {

  // const data = axios.get(`/api/cart/${customerId}`)
  //   .then(res => res.data)

  return {
    type: GET_ALL_CART_ITEMS,
    payload: cartItems
  }
}

export default function cartReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case GET_ALL_CART_ITEMS:
      return { ...state, cartItems: payload }

    default:
      return state
  }
}