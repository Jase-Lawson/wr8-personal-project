const bcrypt = require('bcryptjs')

module.exports = {
  register: async (req, res) => {
    const { firstName, lastName, email, phone, birthdate, address, city, state, zipCode, password } = req.body
    const db = req.app.get('db');

    const [foundUser] = await db.customer.check_customer({ email })
    if (foundUser) {
      return res.status(400).send(`${email} already has an account registered to it.`)
    }

    let salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const [newUser] = await db.customer.register_customer({ firstName, lastName, hash, email, phone, birthdate, address, city, state, zipCode })

    // console.log(newUser)

    req.session.user = newUser
    res.status(201).send(req.session.user)

  },

  login: async (req, res) => {
    const { email, password } = req.body
    const db = req.app.get('db')

    const [foundUser] = await db.customer.check_customer({ email })
    if (!foundUser) {
      return res.status(400).send(`${email} is not associated with any account. Please register to continue.`)
    }

    const authenticated = bcrypt.compareSync(password, foundUser.password)
    if (!authenticated) {
      return res.status(400).send('Incorrect Password.')
    }

    delete foundUser.password
    req.session.user = foundUser
    res.status(202).send(req.session.user)

  },

  logout: (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  },

  edit: async (req, res) => {
    const { firstName, lastName, email, phone, address, city, state, zipCode, customerId } = req.body
    const { customer_id } = req.session.user
    const db = req.app.get('db');

    // console.log(req.session.user)

    await db.customer.edit_customer({ firstName, lastName, email, phone, address, city, state, zipCode, customer_id })

    const [editedUser] = await db.customer.check_customer({ email })

    req.session.user = editedUser
    res.status(201).send(req.session.user)
  },

  getCustomer: async (req, res) => {
    if (req.session.user) {
      return res.status(200).send(req.session.user)
    } res.status(404).send('Please Log In')
  }
}