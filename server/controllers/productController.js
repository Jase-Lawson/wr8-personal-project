
module.exports = {

  add: async (req, res) => {
    const { name, category, sku, price, img } = req.body
    const db = req.app.get('db')

    await db.products.add_product({ name, category, sku, price, img })

    res.sendStatus(201)
  },

  edit: async (req, res) => {
    const { name, category, sku, price, img } = req.body
    const db = req.app.get('db')

    await db.products.edit_product({ name, category, sku, price, img })
    res.sendStatus(200)

  },

  delete: async (req, res) => {
    const { sku } = req.body
    const db = req.app.get('db')

    await db.products.delete_product({ sku })

    res.sendStatus(200)
  },

  getProduct: async (req, res) => {
    const db = req.app.get('db')
    const { product_id } = req.params
    // console.log(product_id)
    const [product] = await db.products.get_product(+product_id)
    res.status(200).send(product)
  },

  getProducts: async (req, res) => {
    const db = req.app.get('db')
    const products = await db.products.get_products()

    res.status(200).send(products)
  }
}