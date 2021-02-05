const initialState = {
  products: [],
  product: {}
}

const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_PRODUCT = 'GET_PRODUCT'

export function getProducts(products) {
  return {
    type: GET_PRODUCTS,
    payload: products
  }
}

export function getProduct(product) {
  return {
    type: GET_PRODUCT,
    payload: product
  }
}


export default function productReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case GET_PRODUCTS:
      return { ...state, products: payload }

    case GET_PRODUCT:
      return { ...state, product: payload }

    default:
      return state
  }
}