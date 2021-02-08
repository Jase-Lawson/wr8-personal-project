module.exports = {

  getCart: async (req, res) => {
    const db = req.app.get('db')
    const { customer_id } = req.session.user;
    const cart = await db.cart.get_all_cart_items({ customer_id })

    // req.session.cart = cart;
    res.status(200).send(cart)

  },

  addToCart: async (req, res) => {

    const db = req.app.get('db')
    const { product_id, quantity } = req.body
    const { customer_id } = req.session.user

    await db.cart.add_to_cart({ customer_id, product_id, quantity })

    res.status(200).send('added to cart')
  },

  changeQuantity: async (req, res) => {

    const db = req.app.get('db')

    await db.cart.change_quantity({})


  },

  deleteCart: (req, res) => {

  }
}