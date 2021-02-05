module.exports = {

  getCart: async (req, res) => {
    const db = req.app.get('db')
    const { customerId } = req.params;
    const cart = await db.cart.get_all_cart_items({ customerId })

    // req.session.cart = cart;
    res.status(400).send(cart)

  },

  addToCart: async (req, res) => {

  },

  changeQuantity: async (req, res) => {

  },

  deleteCart: (req, res) => {

  }
}