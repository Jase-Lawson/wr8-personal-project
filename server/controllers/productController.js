
module.exports = {

  add: async (req, res) => {
    const { name, category, sku, price } = req.body
    const db = req.app.get('db')

    const [newProduct] = await db.products.add_product({ name, category, sku, price })

    const { product_id, url } = newProduct

    await db.products.add_image({ product_id, url })

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
  },

  addImage: async (req, res) => {
    const db = req.app.get('db')
    const { sku, url } = req.body

    const [foundProduct] = await db.products.get_product_by_sku({ sku })

    const { product_id } = foundProduct

    await db.products.add_image({ product_id, url })

    res.sendStatus(200)
  }
}