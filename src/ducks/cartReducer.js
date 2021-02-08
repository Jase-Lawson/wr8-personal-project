const initialState = {
  cartItems: [],
}

const GET_CART = 'GET_CART'

export function getCart(cartItems) {

  return {
    type: GET_CART,
    payload: cartItems
  }
}

export default function cartReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case GET_CART:
      return { ...state, cartItems: payload }

    default:
      return state
  }
}