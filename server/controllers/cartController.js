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

  updateQuantity: async (req, res) => {

    const db = req.app.get('db')
    const { quantity, product_id } = req.body
    const { customer_id } = req.session.user

    await db.cart.update_quantity({ quantity, customer_id, product_id, junction_id })

    const updatedCart = await db.cart.get_all_cart_items({ customer_id })

    res.status(200).send(updatedCart)
  },

  deleteItem: (req, res) => {

    const db = req.app.get('db')
    const { product_id, junction_id } = req.body
    const { customer_id } = req.session.user

    db.cart.delete({ customer_id, product_id, junction_id })

    res.sendStatus(200)
  }
}